const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Ø§Ø³ØªØ¦Ù†Ø§Ù ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ø§Ù„Ù…ØªÙˆÙ‚ÙØ© Ù…Ø¤Ù‚ØªØ§Ù‹'),
  aliases: ['unpause'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: 'âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!', flags: MessageFlags.Ephemeral });
    }

    if (!queue.paused) {
      return interaction.reply({ content: 'âš ï¸ Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø¨Ø§Ù„ÙØ¹Ù„ ÙˆÙ„ÙŠØ³Øª Ù…ØªÙˆÙ‚ÙØ© Ù…Ø¤Ù‚ØªØ§Ù‹!', flags: MessageFlags.Ephemeral });
    }

    queue.resume();
    return interaction.reply('â–¶ï¸ **ØªÙ… Ø§Ø³ØªØ¦Ù†Ø§Ù ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ø¨Ù†Ø¬Ø§Ø­!**');
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!');
    }

    if (!queue.paused) {
      return message.reply('âš ï¸ Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø¨Ø§Ù„ÙØ¹Ù„ ÙˆÙ„ÙŠØ³Øª Ù…ØªÙˆÙ‚ÙØ© Ù…Ø¤Ù‚ØªØ§Ù‹!');
    }

    queue.resume();
    return message.reply('â–¶ï¸ **ØªÙ… Ø§Ø³ØªØ¦Ù†Ø§Ù ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ø¨Ù†Ø¬Ø§Ø­!**');
  },
};



