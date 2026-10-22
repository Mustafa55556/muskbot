const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Ø¹Ø±Ø¶ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø£ÙˆØ§Ù…Ø± Ø§Ù„Ù…ØªØ§Ø­Ø© ÙˆÙƒÙŠÙÙŠØ© Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø¨ÙˆØª'),
  aliases: ['h', 'commands'],
  async executeSlash(interaction, { client, prefix }) {
    const embed = buildHelpEmbed(prefix);
    return interaction.reply({ embeds: [embed] });
  },

  async executePrefix(message, args, { client, prefix }) {
    const embed = buildHelpEmbed(prefix);
    return message.reply({ embeds: [embed] });
  },
};

function buildHelpEmbed(prefix = '!') {
  return new EmbedBuilder()
    .setTitle('ðŸŽµ Ø£ÙˆØ§Ù…Ø± Ø¨ÙˆØª Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰ (MuskBot)')
    .setColor('#5865F2')
    .setDescription(`ÙŠØ¯Ø¹Ù… Ø§Ù„Ø¨ÙˆØª Ø§Ù„Ø£ÙˆØ§Ù…Ø± Ø¨Ø§Ù„Ø³Ù„Ø§Ø´ (\`/\`) ÙˆØ£ÙˆØ§Ù…Ø± Ø§Ù„Ø¨Ø±ÙŠÙÙƒØ³ (\`${prefix}\`):\nÙŠØ¯Ø¹Ù… Ø§Ù„ØªØ´ØºÙŠÙ„ Ù…Ù†: **YouTube**, **Spotify**, **SoundCloud**, ÙˆØ§Ù„Ø±ÙˆØ§Ø¨Ø· Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø©!`)
    .addFields(
      {
        name: 'â–¶ï¸ Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆØ§Ù„ØªØ­ÙƒÙ… Ø§Ù„Ø£Ø³Ø§Ø³ÙŠ',
        value:
          `â€¢ \`/play <query>\` Ø£Ùˆ \`${prefix}play <query>\` - ØªØ´ØºÙŠÙ„ Ø£ØºÙ†ÙŠØ© Ø£Ùˆ Ø¨Ø­Ø«\n` +
          `â€¢ \`/pause\` Ø£Ùˆ \`${prefix}pause\` - Ø¥ÙŠÙ‚Ø§Ù Ù…Ø¤Ù‚Øª\n` +
          `â€¢ \`/resume\` Ø£Ùˆ \`${prefix}resume\` - Ø§Ø³ØªØ¦Ù†Ø§Ù Ø§Ù„ØªØ´ØºÙŠÙ„\n` +
          `â€¢ \`/skip\` Ø£Ùˆ \`${prefix}skip\` - ØªØ®Ø·ÙŠ Ø§Ù„Ø£ØºÙ†ÙŠØ© Ø§Ù„Ø­Ø§Ù„ÙŠØ©\n` +
          `â€¢ \`/stop\` Ø£Ùˆ \`${prefix}stop\` - Ø¥ÙŠÙ‚Ø§Ù ÙˆÙ…ØºØ§Ø¯Ø±Ø© Ø§Ù„Ø±ÙˆÙ…`,
      },
      {
        name: 'ðŸ“œ Ø§Ù„Ù‚ÙˆØ§Ø¦Ù… ÙˆØ§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª',
        value:
          `â€¢ \`/queue\` Ø£Ùˆ \`${prefix}queue\` - Ø¹Ø±Ø¶ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±\n` +
          `â€¢ \`/nowplaying\` Ø£Ùˆ \`${prefix}np\` - ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø£ØºÙ†ÙŠØ© Ø§Ù„Ø­Ø§Ù„ÙŠØ© ÙˆØ´Ø±ÙŠØ· Ø§Ù„ØªÙ‚Ø¯Ù…\n` +
          `â€¢ \`/volume [1-100]\` Ø£Ùˆ \`${prefix}volume [1-100]\` - ØªØºÙŠÙŠØ± Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµÙˆØª\n` +
          `â€¢ \`/loop <mode>\` Ø£Ùˆ \`${prefix}loop\` - ØªÙƒØ±Ø§Ø± Ø£ØºÙ†ÙŠØ© Ø£Ùˆ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©\n` +
          `â€¢ \`/shuffle\` Ø£Ùˆ \`${prefix}shuffle\` - Ø®Ù„Ø· Ø§Ù„Ø£ØºØ§Ù†ÙŠ Ø¹Ø´ÙˆØ§Ø¦ÙŠØ§Ù‹\n` +
          `â€¢ \`/help\` Ø£Ùˆ \`${prefix}help\` - Ø¹Ø±Ø¶ Ù‡Ø°Ù‡ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©`,
      }
    )
    .setFooter({ text: 'MuskBot Music' })
    .setTimestamp();
}


