require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
  Events,
} = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const ffmpegStatic = require('ffmpeg-static');
const registerDisTubeEvents = require('./events/distubeEvents');

const TOKEN = (process.env.DISCORD_TOKEN || '').replace(/['"]/g, '').trim();
const PREFIX = (process.env.PREFIX || '!').trim();

// تشغيل خادم ويب مصغر لمنصات الاستضافة مثل Render (Web Service Health Check)
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('MuskBot Discord Music is online! 🎵');
});
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 خادم الويب يعمل على 0.0.0.0:${PORT} (جاهز لـ Render)`);
});

if (!TOKEN || TOKEN.trim() === '' || TOKEN.includes('ضع_التوكن')) {
  console.error('\n' + '='.repeat(60));
  console.error('❌ تنبيه: لم تقم بوضع التوكن الخاص بالبوت بعد!');
  console.error('يرجى فتح ملف .env وكتابة التوكن في خانة DISCORD_TOKEN:');
  console.error('DISCORD_TOKEN=your_bot_token_here');
  console.error('='.repeat(60) + '\n');
  process.exit(1);
}

// إنشاء عميل ديسكورد مع الانتينتات المطلوبة
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});

// منح صلاحيات التنفيذ لـ FFmpeg على بيئات لينكس مثل Render
if (ffmpegStatic) {
  try {
    fs.chmodSync(ffmpegStatic, 0o755);
    console.log('✅ تم التحقق من صلاحيات تشغيل FFmpeg بنجاح:', ffmpegStatic);
  } catch (err) {
    console.warn('⚠️ ملاحظة حول صلاحيات FFmpeg:', err.message);
  }
}

// إعداد مشغل الموسيقى DisTube
const distube = new DisTube(client, {
  emitNewSongOnly: true,
  ffmpeg: {
    path: ffmpegStatic,
  },
  plugins: [
    new SpotifyPlugin(),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
});

// تسجيل أحداث الموسيقى
registerDisTubeEvents(distube);

// تحميل الأوامر
client.commands = new Collection();
client.aliases = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const slashCommands = [];

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ('data' in command) {
    client.commands.set(command.data.name, command);
    slashCommands.push(command.data.toJSON());

    // تسجيل الاختصارات للأوامر النصية
    if (command.aliases && Array.isArray(command.aliases)) {
      command.aliases.forEach(alias => {
        client.aliases.set(alias, command.data.name);
      });
    }
  }
}

// عند تشغيل البوت بنجاح
client.once(Events.ClientReady, async () => {
  console.log('\n' + '='.repeat(50));
  console.log(`🤖 تم تشغيل البوت بنجاح: ${client.user.tag}`);
  console.log(`📡 الخوادم المتصل بها: ${client.guilds.cache.size}`);
  console.log('='.repeat(50));

  // تحديث حالة البوت (Status)
  client.user.setActivity({
    name: `/help | ${PREFIX}help 🎶`,
    type: ActivityType.Listening,
  });

  // تسجيل أوامر السلاش (Slash Commands) عالمياً
  try {
    console.log('⏳ جاري تسجيل أوامر السلاش (Slash Commands)...');
    await client.application.commands.set(slashCommands);
    console.log(`✅ تم تسجيل ${slashCommands.length} أمراً بنجاح في ديسكورد!`);
  } catch (error) {
    console.error('❌ حدث خطأ أثناء تسجيل أوامر السلاش:', error);
  }
});

// معالجة أوامر السلاش (Slash Commands Interaction)
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command || !command.executeSlash) return;

  try {
    await command.executeSlash(interaction, { client, distube, prefix: PREFIX });
  } catch (error) {
    console.error(`خطأ أثناء تنفيذ الأمر ${interaction.commandName}:`, error);
    const errorResponse = {
      content: '❌ حدث خطأ غير متوقع أثناء تنفيذ هذا الأمر!',
      ephemeral: true,
    };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorResponse).catch(() => {});
    } else {
      await interaction.reply(errorResponse).catch(() => {});
    }
  }
});

// معالجة الأوامر النصية العادية (Prefix Commands)
client.on(Events.MessageCreate, async message => {
  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const actualCommandName = client.aliases.get(commandName) || commandName;
  const command = client.commands.get(actualCommandName);

  if (!command || !command.executePrefix) return;

  try {
    await command.executePrefix(message, args, { client, distube, prefix: PREFIX });
  } catch (error) {
    console.error(`خطأ أثناء تنفيذ الأمر ${commandName}:`, error);
    message.reply('❌ حدث خطأ أثناء تنفيذ الأمر!').catch(() => {});
  }
});

// معالجة أخطاء العميل والاتصال
client.on('error', error => {
  console.error('⚠️ Discord Client Error:', error);
});

client.on('warn', warning => {
  console.warn('⚠️ Discord Client Warning:', warning);
});

client.rest.on('error', error => {
  console.error('⚠️ Discord REST Error:', error);
});

// منع توقف البوت عند الأخطاء غير المتوقعة
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', error => {
  console.error('⚠️ Uncaught Exception:', error?.stack || error);
});

// معالجة إشارات الإيقاف لإغلاق الاتصال بأمان
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, closing client...');
  client.destroy();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, closing client...');
  client.destroy();
  process.exit(0);
});

// تسجيل الدخول
client.login(TOKEN).catch(error => {
  console.error('❌ فشل تسجيل دخول البوت إلى ديسكورد:', error);
});
