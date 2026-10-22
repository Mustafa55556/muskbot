const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('ØªØ®Ø·ÙŠ Ø§Ù„Ø£ØºÙ†ÙŠØ© Ø§Ù„Ø­Ø§Ù„ÙŠØ© ÙˆØ§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ù„Ù„Ø£ØºÙ†ÙŠØ© Ø§Ù„ØªØ§Ù„ÙŠØ©'),
  aliases: ['s'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: 'âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!', flags: MessageFlags.Ephemeral });
    }

    try {
      if (queue.songs.length <= 1 && !queue.autoplay) {
        await queue.stop();
        return interaction.reply('â¹ï¸ **ØªÙ… ØªØ®Ø·ÙŠ Ø§Ù„Ø£ØºÙ†ÙŠØ© ÙˆØ¥ÙŠÙ‚Ø§Ù Ø§Ù„ØªØ´ØºÙŠÙ„** (Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ØºØ§Ù†Ù Ø£Ø®Ø±Ù‰ ÙÙŠ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±).');
      }

      const song = await queue.skip();
      return interaction.reply(`â­ï¸ **ØªÙ… Ø§Ù„ØªØ®Ø·ÙŠ!** Ø§Ù„Ø£ØºÙ†ÙŠØ© Ø§Ù„ØªØ§Ù„ÙŠØ©: **${song.name}**`);
    } catch (error) {
      return interaction.reply({ content: `âš ï¸ ØªØ¹Ø°Ø± Ø§Ù„ØªØ®Ø·ÙŠ: ${error.message || error}`, flags: MessageFlags.Ephemeral });
    }
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!');
    }

    try {
      if (queue.songs.length <= 1 && !queue.autoplay) {
        await queue.stop();
        return message.reply('â¹ï¸ **ØªÙ… ØªØ®Ø·ÙŠ Ø§Ù„Ø£ØºÙ†ÙŠØ© ÙˆØ¥ÙŠÙ‚Ø§Ù Ø§Ù„ØªØ´ØºÙŠÙ„** (Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ØºØ§Ù†Ù Ø£Ø®Ø±Ù‰ ÙÙŠ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±).');
      }

      const song = await queue.skip();
      return message.reply(`â­ï¸ **ØªÙ… Ø§Ù„ØªØ®Ø·ÙŠ!** Ø§Ù„Ø£ØºÙ†ÙŠØ© Ø§Ù„ØªØ§Ù„ÙŠØ©: **${song.name}**`);
    } catch (error) {
      return message.reply(`âš ï¸ ØªØ¹Ø°Ø± Ø§Ù„ØªØ®Ø·ÙŠ: ${error.message || error}`);
    }
  },
};



