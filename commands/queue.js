const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('عرض قائمة الأغاني الحالية وفي الانتظار'),
  aliases: ['q'],
  async executeSlash(interaction, { distube }) {
    const queue = distube.getQueue(interaction.guildId);
    if (!queue || !queue.songs.length) {
      return interaction.reply({ content: '❌ قائمة الانتظار فارغة حالياً!', ephemeral: true });
    }

    const embed = buildQueueEmbed(queue);
    return interaction.reply({ embeds: [embed] });
  },

  async executePrefix(message, args, { distube }) {
    const queue = distube.getQueue(message.guildId);
    if (!queue || !queue.songs.length) {
      return message.reply('❌ قائمة الانتظار فارغة حالياً!');
    }

    const embed = buildQueueEmbed(queue);
    return message.reply({ embeds: [embed] });
  },
};

function buildQueueEmbed(queue) {
  const currentSong = queue.songs[0];
  const upcomingSongs = queue.songs.slice(1, 11);

  let description = `🎶 **قيد التشغيل الآن:**\n[${currentSong.name}](${currentSong.url}) | \`${currentSong.formattedDuration}\` - طلب: ${currentSong.user}\n\n`;

  if (upcomingSongs.length > 0) {
    description += `📜 **الأغاني القادمة:**\n`;
    description += upcomingSongs
      .map((song, index) => `**${index + 1}.** [${song.name}](${song.url}) | \`${song.formattedDuration}\` - طلب: ${song.user}`)
      .join('\n');

    if (queue.songs.length > 11) {
      description += `\n\n*... والمزيد (${queue.songs.length - 11} أغانٍ إضافية)*`;
    }
  } else {
    description += `*لا توجد أغانٍ قادمة في قائمة الانتظار.*`;
  }

  return new EmbedBuilder()
    .setTitle('📋 قائمة الانتظار الحالية')
    .setColor('#5865F2')
    .setDescription(description)
    .addFields(
      { name: '🎵 إجمالي الأغاني', value: `${queue.songs.length}`, inline: true },
      { name: '⏱️ المدة الإجمالية', value: `${queue.formattedDuration}`, inline: true },
      { name: '🔊 مستوى الصوت', value: `${queue.volume}%`, inline: true }
    )
    .setFooter({ text: 'MuskBot Music' })
    .setTimestamp();
}
