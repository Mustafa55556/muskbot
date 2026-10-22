const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Ø¹Ø±Ø¶ ØªÙØ§ØµÙŠÙ„ ÙˆÙ…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø£ØºÙ†ÙŠØ© Ø§Ù„ØªÙŠ ØªØ¹Ù…Ù„ Ø­Ø§Ù„ÙŠØ§Ù‹'),
  aliases: ['np'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue || !queue.songs.length) {
      return interaction.reply({ content: 'âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!', flags: MessageFlags.Ephemeral });
    }

    const embed = buildNowPlayingEmbed(queue);
    return interaction.reply({ embeds: [embed] });
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue || !queue.songs.length) {
      return message.reply('âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!');
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
      ? 'ðŸ” Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© ÙƒØ§Ù…Ù„Ø©'
      : queue.repeatMode === 1
      ? 'ðŸ”‚ Ø§Ù„Ø£ØºÙ†ÙŠØ© Ø§Ù„Ø­Ø§Ù„ÙŠØ©'
      : 'âŒ Ù…Ø¹Ø·Ù„';

  return new EmbedBuilder()
    .setTitle('ðŸŽ¶ Ø§Ù„Ø£ØºÙ†ÙŠØ© Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ø¢Ù†')
    .setDescription(`**[${song.name}](${song.url})**\n\n\`${queue.formattedCurrentTime}\` ${progressBar} \`${song.formattedDuration}\``)
    .setColor('#5865F2')
    .setThumbnail(song.thumbnail)
    .addFields(
      { name: 'ðŸ‘¤ Ø·Ù„Ø¨ Ø¨ÙˆØ§Ø³Ø·Ø©', value: `${song.user}`, inline: true },
      { name: 'ðŸ”Š Ø§Ù„ØµÙˆØª', value: `${queue.volume}%`, inline: true },
      { name: 'ðŸ” Ø§Ù„ØªÙƒØ±Ø§Ø±', value: repeatModeStr, inline: true }
    )
    .setFooter({ text: `Ø§Ù„Ù…ØµØ¯Ø±: ${song.source || 'Online'} | MuskBot` })
    .setTimestamp();
}

function createProgressBar(current, total, size = 15) {
  if (!total || total === 0) return 'ðŸ”˜' + 'â–¬'.repeat(size);
  const progress = Math.min(Math.max(current / total, 0), 1);
  const progressIndex = Math.round(progress * size);
  const emptyProgress = Math.max(size - progressIndex, 0);
  return 'â–¬'.repeat(progressIndex) + 'ðŸ”˜' + 'â–¬'.repeat(emptyProgress);
}



