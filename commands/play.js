const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('تشغيل أغنية أو قائمة تشغيل (يوتيوب، سبوتيفاي، ساوندكلاود أو بحث)')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('اسم الأغنية أو الرابط')
        .setRequired(true)
    ),
  aliases: ['p'],
  async executeSlash(interaction, { distube }) {
    const voiceChannel = interaction.member?.voice?.channel;
    if (!voiceChannel) {
      return interaction.reply({
        content: '❌ يجب أن تكون متواجداً في روم صوتي أولاً لتشغيل الموسيقى!',
        flags: MessageFlags.Ephemeral,
      });
    }

    const botVoiceChannel = interaction.guild.members.me?.voice?.channel;
    if (botVoiceChannel && botVoiceChannel.id !== voiceChannel.id) {
      return interaction.reply({
        content: `❌ البوت متواجد حالياً في روم صوتي آخر (<#${botVoiceChannel.id}>)!`,
        flags: MessageFlags.Ephemeral,
      });
    }

    const query = interaction.options.getString('query');
    await interaction.deferReply();

    try {
      await distube.play(voiceChannel, query, {
        textChannel: interaction.channel,
        member: interaction.member,
      });

      await interaction.editReply({
        content: `🔍 **جاري البحث والتشغيل:** \`${query}\`...`,
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: `❌ حدث خطأ أثناء محاولة التشغيل: ${error.message || error}`,
      });
    }
  },

  async executePrefix(message, args, { distube }) {
    const voiceChannel = message.member?.voice?.channel;
    if (!voiceChannel) {
      return message.reply('❌ يجب أن تكون متواجداً في روم صوتي أولاً لتشغيل الموسيقى!');
    }

    const botVoiceChannel = message.guild.members.me?.voice?.channel;
    if (botVoiceChannel && botVoiceChannel.id !== voiceChannel.id) {
      return message.reply(`❌ البوت متواجد حالياً في روم صوتي آخر (<#${botVoiceChannel.id}>)!`);
    }

    const query = args.join(' ');
    if (!query) {
      return message.reply('⚠️ يرجى كتابة اسم الأغنية أو الرابط بعد الأمر. مثال:\n`!play faded`');
    }

    try {
      await distube.play(voiceChannel, query, {
        textChannel: message.channel,
        member: message.member,
      });

      await message.reply(`🔍 **جاري البحث والتشغيل:** \`${query}\`...`);
    } catch (error) {
      console.error(error);
      await message.reply(`❌ حدث خطأ أثناء محاولة التشغيل: ${error.message || error}`);
    }
  },
};
