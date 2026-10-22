const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('تخطي الأغنية الحالية والانتقال للأغنية التالية'),
  aliases: ['s'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ لا توجد أي موسيقى قيد التشغيل حالياً!', ephemeral: true });
    }

    try {
      if (queue.songs.length <= 1 && !queue.autoplay) {
        await queue.stop();
        return interaction.reply('⏹️ **تم تخطي الأغنية وإيقاف التشغيل** (لا توجد أغانٍ أخرى في قائمة الانتظار).');
      }

      const song = await queue.skip();
      return interaction.reply(`⏭️ **تم التخطي!** الأغنية التالية: **${song.name}**`);
    } catch (error) {
      return interaction.reply({ content: `⚠️ تعذر التخطي: ${error.message || error}`, ephemeral: true });
    }
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('❌ لا توجد أي موسيقى قيد التشغيل حالياً!');
    }

    try {
      if (queue.songs.length <= 1 && !queue.autoplay) {
        await queue.stop();
        return message.reply('⏹️ **تم تخطي الأغنية وإيقاف التشغيل** (لا توجد أغانٍ أخرى في قائمة الانتظار).');
      }

      const song = await queue.skip();
      return message.reply(`⏭️ **تم التخطي!** الأغنية التالية: **${song.name}**`);
    } catch (error) {
      return message.reply(`⚠️ تعذر التخطي: ${error.message || error}`);
    }
  },
};
