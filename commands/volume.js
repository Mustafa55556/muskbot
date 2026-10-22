const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('ØªØ¹Ø¯ÙŠÙ„ Ù…Ø³ØªÙˆÙ‰ ØµÙˆØª Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰ (Ù…Ù† 1 Ø¥Ù„Ù‰ 100)')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµÙˆØª Ø¨Ø§Ù„Ù†Ø³Ø¨Ø© Ø§Ù„Ù…Ø¦ÙˆÙŠØ© (1-100)')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(false)
    ),
  aliases: ['vol', 'v'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: 'âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!', flags: MessageFlags.Ephemeral });
    }

    const amount = interaction.options.getInteger('amount');
    if (amount === null) {
      return interaction.reply(`ðŸ”Š Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµÙˆØª Ø§Ù„Ø­Ø§Ù„ÙŠ Ù‡Ùˆ: **${queue.volume}%**`);
    }

    queue.setVolume(amount);
    return interaction.reply(`ðŸ”Š ØªÙ… Ø¶Ø¨Ø· Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµÙˆØª Ø¨Ù†Ø¬Ø§Ø­ Ø¥Ù„Ù‰: **${amount}%**`);
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue) {
      return message.reply('âŒ Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙŠ Ù…ÙˆØ³ÙŠÙ‚Ù‰ Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø­Ø§Ù„ÙŠØ§Ù‹!');
    }

    if (!args[0]) {
      return message.reply(`ðŸ”Š Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµÙˆØª Ø§Ù„Ø­Ø§Ù„ÙŠ Ù‡Ùˆ: **${queue.volume}%**`);
    }

    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount < 1 || amount > 100) {
      return message.reply('âš ï¸ ÙŠØ±Ø¬Ù‰ ØªØ­Ø¯ÙŠØ¯ Ø±Ù‚Ù… ØµØ§Ù„Ø­ Ø¨ÙŠÙ† 1 Ùˆ 100.');
    }

    queue.setVolume(amount);
    return message.reply(`ðŸ”Š ØªÙ… Ø¶Ø¨Ø· Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµÙˆØª Ø¨Ù†Ø¬Ø§Ø­ Ø¥Ù„Ù‰: **${amount}%**`);
  },
};



