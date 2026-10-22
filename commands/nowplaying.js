const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('عرض تفاصيل ومعلومات الأغنية التي تعمل حالياً'),
  aliases: ['np'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue || !queue.songs.length) {
      return interaction.reply({ content: '❌ لا توجد أي موسيقى قيد التشغيل حالياً!', ephemeral: true });
    }

    const embed = buildNowPlayingEmbed(queue);
    return interaction.reply({ embeds: [embed] });
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue || !queue.songs.length) {
      return message.reply('❌ لا توجد أي موسيقى قيد التشغيل حالياً!');
    }

    const embed = buildNowPlayingEmbed(queue);
    return message.reply({ embeds: [embed] });
  },
};

function buildNowPlayingEmbed(queue) {
  const song = queue.songs[0];
  const currentTime = queue.currentTime;
  const duration = song.duration;
  const progressBar = createProgressBar(currentTime, duration, 16);

  const repeatModeStr =
    queue.repeatMode === 2
      ? '🔁 القائمة كاملة'
      : queue.repeatMode === 1
      ? '🔂 الأغنية الحالية'
      : '❌ معطل';

  return new EmbedBuilder()
    .setTitle('🎶 الأغنية قيد التشغيل الآن')
    .setDescription(`**[${song.name}](${song.url})**\n\n\`${queue.formattedCurrentTime}\` ${progressBar} \`${song.formattedDuration}\``)
    .setColor('#5865F2')
    .setThumbnail(song.thumbnail)
    .addFields(
      { name: '👤 طلب بواسطة', value: `${song.user}`, inline: true },
      { name: '🔊 الصوت', value: `${queue.volume}%`, inline: true },
      { name: '🔁 التكرار', value: repeatModeStr, inline: true }
    )
    .setFooter({ text: `المصدر: ${song.source || 'Online'} | MuskBot` })
    .setTimestamp();
}

function createProgressBar(current, total, size = 15) {
  if (!total || total === 0) return '🔘' + '▬'.repeat(size);
  const progress = Math.min(Math.max(current / total, 0), 1);
  const progressIndex = Math.round(progress * size);
  const emptyProgress = Math.max(size - progressIndex, 0);
  return '▬'.repeat(progressIndex) + '🔘' + '▬'.repeat(emptyProgress);
}
