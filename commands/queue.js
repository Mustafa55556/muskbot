const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Ø¹Ø±Ø¶ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø£ØºØ§Ù†ÙŠ Ø§Ù„Ø­Ø§Ù„ÙŠØ© ÙˆÙÙŠ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±'),
  aliases: ['q'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue || !queue.songs.length) {
      return interaction.reply({ content: 'âŒ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± ÙØ§Ø±ØºØ© Ø­Ø§Ù„ÙŠØ§Ù‹!', flags: MessageFlags.Ephemeral });
    }

    const embed = buildQueueEmbed(queue);
    return interaction.reply({ embeds: [embed] });
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue || !queue.songs.length) {
      return message.reply('âŒ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± ÙØ§Ø±ØºØ© Ø­Ø§Ù„ÙŠØ§Ù‹!');
    }

    const embed = buildQueueEmbed(queue);
    return message.reply({ embeds: [embed] });
  },
};

function buildQueueEmbed(queue) {
  const currentSong = queue.songs[0];
  const upcomingSongs = queue.songs.slice(1, 11);

  let description = `ðŸŽ¶ **Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ø¢Ù†:**\n[${currentSong.name}](${currentSong.url}) | \`${currentSong.formattedDuration}\` - Ø·Ù„Ø¨: ${currentSong.user}\n\n`;

  if (upcomingSongs.length > 0) {
    description += `ðŸ“œ **Ø§Ù„Ø£ØºØ§Ù†ÙŠ Ø§Ù„Ù‚Ø§Ø¯Ù…Ø©:**\n`;
    description += upcomingSongs
      .map((song, index) => `**${index + 1}.** [${song.name}](${song.url}) | \`${song.formattedDuration}\` - Ø·Ù„Ø¨: ${song.user}`)
      .join('\n');

    if (queue.songs.length > 11) {
      description += `\n\n*... ÙˆØ§Ù„Ù…Ø²ÙŠØ¯ (${queue.songs.length - 11} Ø£ØºØ§Ù†Ù Ø¥Ø¶Ø§ÙÙŠØ©)*`;
    }
  } else {
    description += `*Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ØºØ§Ù†Ù Ù‚Ø§Ø¯Ù…Ø© ÙÙŠ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±.*`;
  }

  return new EmbedBuilder()
    .setTitle('ðŸ“‹ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± Ø§Ù„Ø­Ø§Ù„ÙŠØ©')
    .setColor('#5865F2')
    .setDescription(description)
    .addFields(
      { name: 'ðŸŽµ Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø£ØºØ§Ù†ÙŠ', value: `${queue.songs.length}`, inline: true },
      { name: 'â±ï¸ Ø§Ù„Ù…Ø¯Ø© Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠØ©', value: `${queue.formattedDuration}`, inline: true },
      { name: 'ðŸ”Š Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµÙˆØª', value: `${queue.volume}%`, inline: true }
    )
    .setFooter({ text: 'MuskBot Music' })
    .setTimestamp();
}



