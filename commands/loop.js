const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('تغيير وضع تكرار الأغاني (إيقاف، تكرار الأغنية، تكرار القائمة)')
    .addIntegerOption(option =>
      option.setName('mode')
        .setDescription('اختر وضع التكرار')
        .setRequired(true)
        .addChoices(
          { name: '❌ إيقاف التكرار (Off)', value: 0 },
          { name: '🔂 تكرار الأغنية الحالية (Song)', value: 1 },
          { name: '🔁 تكرار قائمة الانتظار كاملة (Queue)', value: 2 }
        )
    ),
  aliases: ['repeat'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ لا توجد أي موسيقى قيد التشغيل حالياً!', flags: MessageFlags.Ephemeral });
    }

    const mode = interaction.options.getInteger('mode');
    queue.setRepeatMode(mode);

    const modeText = mode === 2 ? '🔁 تكرار القائمة بالكامل' : mode === 1 ? '🔂 تكرار الأغنية الحالية' : '❌ إيقاف التكرار';
    return interaction.reply(`وضع التكرار الحالي: **${modeText}**`);
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('❌ لا توجد أي موسيقى قيد التشغيل حالياً!');
    }

    let mode = 0;
    const arg = (args[0] || '').toLowerCase();

    if (arg === 'song' || arg === '1' || arg === 's') {
      mode = 1;
    } else if (arg === 'queue' || arg === '2' || arg === 'q' || arg === 'all') {
      mode = 2;
    } else if (arg === 'off' || arg === '0' || arg === 'disable') {
      mode = 0;
    } else {
      mode = (queue.repeatMode + 1) % 3;
    }

    queue.setRepeatMode(mode);
    const modeText = mode === 2 ? '🔁 تكرار القائمة بالكامل' : mode === 1 ? '🔂 تكرار الأغنية الحالية' : '❌ إيقاف التكرار';
    return message.reply(`تم ضبط وضع التكرار إلى: **${modeText}**`);
  },
};
