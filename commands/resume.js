const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('استئناف تشغيل الموسيقى المتوقفة مؤقتاً'),
  aliases: ['unpause'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ لا توجد أي موسيقى قيد التشغيل حالياً!', ephemeral: true });
    }

    if (!queue.paused) {
      return interaction.reply({ content: '⚠️ الموسيقى قيد التشغيل بالفعل وليست متوقفة مؤقتاً!', ephemeral: true });
    }

    queue.resume();
    return interaction.reply('▶️ **تم استئناف تشغيل الموسيقى بنجاح!**');
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('❌ لا توجد أي موسيقى قيد التشغيل حالياً!');
    }

    if (!queue.paused) {
      return message.reply('⚠️ الموسيقى قيد التشغيل بالفعل وليست متوقفة مؤقتاً!');
    }

    queue.resume();
    return message.reply('▶️ **تم استئناف تشغيل الموسيقى بنجاح!**');
  },
};
