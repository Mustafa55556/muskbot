const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('تعديل مستوى صوت الموسيقى (من 1 إلى 100)')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('مستوى الصوت بالنسبة المئوية (1-100)')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(false)
    ),
  aliases: ['vol', 'v'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ لا توجد أي موسيقى قيد التشغيل حالياً!', ephemeral: true });
    }

    const amount = interaction.options.getInteger('amount');
    if (amount === null) {
      return interaction.reply(`🔊 مستوى الصوت الحالي هو: **${queue.volume}%**`);
    }

    queue.setVolume(amount);
    return interaction.reply(`🔊 تم ضبط مستوى الصوت بنجاح إلى: **${amount}%**`);
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('❌ لا توجد أي موسيقى قيد التشغيل حالياً!');
    }

    if (!args[0]) {
      return message.reply(`🔊 مستوى الصوت الحالي هو: **${queue.volume}%**`);
    }

    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount < 1 || amount > 100) {
      return message.reply('⚠️ يرجى تحديد رقم صالح بين 1 و 100.');
    }

    queue.setVolume(amount);
    return message.reply(`🔊 تم ضبط مستوى الصوت بنجاح إلى: **${amount}%**`);
  },
};
