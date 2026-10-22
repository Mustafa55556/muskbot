const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('خلط وترتيب الأغاني عشوائياً في قائمة الانتظار'),
  aliases: ['sh'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ لا توجد أي موسيقى قيد التشغيل حالياً!', ephemeral: true });
    }

    if (queue.songs.length <= 2) {
      return interaction.reply({ content: '⚠️ يجب أن يتوفر على الأقل أغنيتان في قائمة الانتظار لتتمكن من خلطهما!', ephemeral: true });
    }

    queue.shuffle();
    return interaction.reply('🔀 **تم خلط قائمة الانتظار عشوائياً بنجاح!**');
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('❌ لا توجد أي موسيقى قيد التشغيل حالياً!');
    }

    if (queue.songs.length <= 2) {
      return message.reply('⚠️ يجب أن يتوفر على الأقل أغنيتان في قائمة الانتظار لتتمكن من خلطهما!');
    }

    queue.shuffle();
    return message.reply('🔀 **تم خلط قائمة الانتظار عشوائياً بنجاح!**');
  },
};
