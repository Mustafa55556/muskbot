const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Ø®Ù„Ø· ÙˆØªØ±ØªÙŠØ¨ Ø§Ù„Ø£ØºØ§Ù†ÙŠ Ø¹Ø´ÙˆØ§Ø¦ÙŠØ§Ù‹ ÙÙŠ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±'),
  aliases: ['sh'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: 'âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!', flags: MessageFlags.Ephemeral });
    }

    if (queue.songs.length <= 2) {
      return interaction.reply({ content: 'âš ï¸ ÙŠØ¬Ø¨ Ø£Ù† ÙŠØªÙˆÙØ± Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„ Ø£ØºÙ†ÙŠØªØ§Ù† ÙÙŠ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± Ù„ØªØªÙ…ÙƒÙ† Ù…Ù† Ø®Ù„Ø·Ù‡Ù…Ø§!', flags: MessageFlags.Ephemeral });
    }

    queue.shuffle();
    return interaction.reply('ðŸ”€ **ØªÙ… Ø®Ù„Ø· Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± Ø¹Ø´ÙˆØ§Ø¦ÙŠØ§Ù‹ Ø¨Ù†Ø¬Ø§Ø­!**');
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!');
    }

    if (queue.songs.length <= 2) {
      return message.reply('âš ï¸ ÙŠØ¬Ø¨ Ø£Ù† ÙŠØªÙˆÙØ± Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„ Ø£ØºÙ†ÙŠØªØ§Ù† ÙÙŠ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± Ù„ØªØªÙ…ÙƒÙ† Ù…Ù† Ø®Ù„Ø·Ù‡Ù…Ø§!');
    }

    queue.shuffle();
    return message.reply('ðŸ”€ **ØªÙ… Ø®Ù„Ø· Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± Ø¹Ø´ÙˆØ§Ø¦ÙŠØ§Ù‹ Ø¨Ù†Ø¬Ø§Ø­!**');
  },
};



