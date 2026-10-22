const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('إيقاف تشغيل الموسيقى ومسح قائمة الانتظار ومغادرة الروم الصوتي'),
  aliases: ['leave', 'dc', 'disconnect'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ لا توجد أي موسيقى قيد التشغيل حالياً!', ephemeral: true });
    }

    await queue.stop();
    return interaction.reply('⏹️ **تم إيقاف الموسيقى ومسح قائمة الانتظار ومغادرة الروم الصوتي.**');
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('❌ لا توجد أي موسيقى قيد التشغيل حالياً!');
    }

    await queue.stop();
    return message.reply('⏹️ **تم إيقاف الموسيقى ومسح قائمة الانتظار ومغادرة الروم الصوتي.**');
  },
};
