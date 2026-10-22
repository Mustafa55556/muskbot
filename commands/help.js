const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('عرض قائمة الأوامر المتاحة وكيفية استخدام البوت'),
  aliases: ['h', 'commands'],
  async executeSlash(interaction, { client, prefix }) {
    const embed = buildHelpEmbed(prefix);
    return interaction.reply({ embeds: [embed] });
  },

  async executePrefix(message, args, { client, prefix }) {
    const embed = buildHelpEmbed(prefix);
    return message.reply({ embeds: [embed] });
  },
};

function buildHelpEmbed(prefix = '!') {
  return new EmbedBuilder()
    .setTitle('🎵 أوامر بوت الموسيقى (MuskBot)')
    .setColor('#5865F2')
    .setDescription(`يدعم البوت الأوامر بالسلاش (\`/\`) وأوامر البريفكس (\`${prefix}\`):\nيدعم التشغيل من: **YouTube**, **Spotify**, **SoundCloud**, والروابط المباشرة!`)
    .addFields(
      {
        name: '▶️ التشغيل والتحكم الأساسي',
        value:
          `• \`/play <query>\` أو \`${prefix}play <query>\` - تشغيل أغنية أو بحث\n` +
          `• \`/pause\` أو \`${prefix}pause\` - إيقاف مؤقت\n` +
          `• \`/resume\` أو \`${prefix}resume\` - استئناف التشغيل\n` +
          `• \`/skip\` أو \`${prefix}skip\` - تخطي الأغنية الحالية\n` +
          `• \`/stop\` أو \`${prefix}stop\` - إيقاف ومغادرة الروم`,
      },
      {
        name: '📜 القوائم والمعلومات',
        value:
          `• \`/queue\` أو \`${prefix}queue\` - عرض قائمة الانتظار\n` +
          `• \`/nowplaying\` أو \`${prefix}np\` - تفاصيل الأغنية الحالية وشريط التقدم\n` +
          `• \`/volume [1-100]\` أو \`${prefix}volume [1-100]\` - تغيير مستوى الصوت\n` +
          `• \`/loop <mode>\` أو \`${prefix}loop\` - تكرار أغنية أو القائمة\n` +
          `• \`/shuffle\` أو \`${prefix}shuffle\` - خلط الأغاني عشوائياً\n` +
          `• \`/help\` أو \`${prefix}help\` - عرض هذه القائمة`,
      }
    )
    .setFooter({ text: 'MuskBot Music' })
    .setTimestamp();
}
