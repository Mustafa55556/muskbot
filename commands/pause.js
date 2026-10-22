const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Ø¥ÙŠÙ‚Ø§Ù ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù…Ø¤Ù‚ØªØ§Ù‹'),
  aliases: [],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: 'âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!', flags: MessageFlags.Ephemeral });
    }

    if (queue.paused) {
      return interaction.reply({ content: 'âš ï¸ Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù…ØªÙˆÙ‚ÙØ© Ù…Ø¤Ù‚ØªØ§Ù‹ Ø¨Ø§Ù„ÙØ¹Ù„!', flags: MessageFlags.Ephemeral });
    }

    queue.pause();
    return interaction.reply('â¸ï¸ **ØªÙ… Ø¥ÙŠÙ‚Ø§Ù Ø§Ù„ØªØ´ØºÙŠÙ„ Ù…Ø¤Ù‚ØªØ§Ù‹.** Ø§Ø³ØªØ®Ø¯Ù… `/resume` Ù„Ù„Ø§Ø³ØªØ¦Ù†Ø§Ù.');
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!');
    }

    if (queue.paused) {
      return message.reply('âš ï¸ Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù…ØªÙˆÙ‚ÙØ© Ù…Ø¤Ù‚ØªØ§Ù‹ Ø¨Ø§Ù„ÙØ¹Ù„!');
    }

    queue.pause();
    return message.reply('â¸ï¸ **ØªÙ… Ø¥ÙŠÙ‚Ø§Ù Ø§Ù„ØªØ´ØºÙŠÙ„ Ù…Ø¤Ù‚ØªØ§Ù‹.** Ø§Ø³ØªØ®Ø¯Ù… `!resume` Ù„Ù„Ø§Ø³ØªØ¦Ù†Ø§Ù.');
  },
};



