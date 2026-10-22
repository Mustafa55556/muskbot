const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('إيقاف تشغيل الموسيقى مؤقتاً'),
  aliases: [],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ لا توجد أي موسيقى قيد التشغيل حالياً!', ephemeral: true });
    }

    if (queue.paused) {
      return interaction.reply({ content: '⚠️ الموسيقى متوقفة مؤقتاً بالفعل!', ephemeral: true });
    }

    queue.pause();
    return interaction.reply('⏸️ **تم إيقاف التشغيل مؤقتاً.** استخدم `/resume` للاستئناف.');
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('❌ لا توجد أي موسيقى قيد التشغيل حالياً!');
    }

    if (queue.paused) {
      return message.reply('⚠️ الموسيقى متوقفة مؤقتاً بالفعل!');
    }

    queue.pause();
    return message.reply('⏸️ **تم إيقاف التشغيل مؤقتاً.** استخدم `!resume` للاستئناف.');
  },
};
