const { EmbedBuilder } = require('discord.js');

module.exports = function registerDisTubeEvents(distube) {
  // عند بدء تشغيل أغنية
  distube.on('playSong', (queue, song) => {
    if (!queue.textChannel) return;

    const embed = new EmbedBuilder()
      .setTitle('🎶 قيد التشغيل الآن')
      .setDescription(`**[${song.name}](${song.url})**`)
      .setColor('#5865F2')
      .setThumbnail(song.thumbnail)
      .addFields(
        { name: '⏱️ المدة', value: `\`${song.formattedDuration}\``, inline: true },
        { name: '👤 طلب بواسطة', value: `${song.user}`, inline: true },
        { name: '🔊 مستوى الصوت', value: `\`${queue.volume}%\``, inline: true }
      )
      .setFooter({ text: `المصدر: ${song.source || 'Online'} | MuskBot` })
      .setTimestamp();

    queue.textChannel.send({ embeds: [embed] }).catch(console.error);
  });

  // عند إضافة أغنية إلى قائمة الانتظار
  distube.on('addSong', (queue, song) => {
    if (!queue.textChannel) return;

    const embed = new EmbedBuilder()
      .setTitle('➕ تمت الإضافة إلى قائمة الانتظار')
      .setDescription(`**[${song.name}](${song.url})**`)
      .setColor('#57F287')
      .setThumbnail(song.thumbnail)
      .addFields(
        { name: '⏱️ المدة', value: `\`${song.formattedDuration}\``, inline: true },
        { name: '🔢 الترتيب في القائمة', value: `#${queue.songs.length}`, inline: true },
        { name: '👤 طلب بواسطة', value: `${song.user}`, inline: true }
      )
      .setTimestamp();

    queue.textChannel.send({ embeds: [embed] }).catch(console.error);
  });

  // عند إضافة قائمة تشغيل كاملة (Playlist)
  distube.on('addList', (queue, playlist) => {
    if (!queue.textChannel) return;

    const embed = new EmbedBuilder()
      .setTitle('📋 تمت إضافة قائمة التشغيل')
      .setDescription(`**[${playlist.name}](${playlist.url})**`)
      .setColor('#57F287')
      .setThumbnail(playlist.thumbnail)
      .addFields(
        { name: '🎵 عدد الأغاني', value: `\`${playlist.songs.length}\``, inline: true },
        { name: '⏱️ المدة الإجمالية', value: `\`${playlist.formattedDuration}\``, inline: true },
        { name: '👤 طلب بواسطة', value: `${playlist.user}`, inline: true }
      )
      .setTimestamp();

    queue.textChannel.send({ embeds: [embed] }).catch(console.error);
  });

  // عند حدوث خطأ أثناء التشغيل
  distube.on('error', (error, queue, song) => {
    console.error('DisTube Error:', error);

    if (queue?.textChannel) {
      const embed = new EmbedBuilder()
        .setTitle('⚠️ حدث خطأ أثناء تشغيل الصوت')
        .setDescription(`\`\`\`${(error.message || error).toString().slice(0, 500)}\`\`\``)
        .setColor('#ED4245')
        .setTimestamp();

      queue.textChannel.send({ embeds: [embed] }).catch(console.error);
    }
  });

  // عند انتهاء جميع الأغاني في القائمة
  distube.on('finish', queue => {
    if (queue?.textChannel) {
      const embed = new EmbedBuilder()
        .setTitle('✅ اكتملت قائمة الانتظار')
        .setDescription('انتهت جميع الأغاني الموجودة في القائمة.')
        .setColor('#FEE75C');

      queue.textChannel.send({ embeds: [embed] }).catch(console.error);
    }
  });

  // عند إخلاء الروم الصوتي من الأعضاء
  distube.on('empty', queue => {
    if (queue?.textChannel) {
      const embed = new EmbedBuilder()
        .setDescription('👋 غادر البوت الروم الصوتي لعدم وجود أعضاء مستمعين.')
        .setColor('#95A5A6');

      queue.textChannel.send({ embeds: [embed] }).catch(console.error);
    }
  });

  // عند فصل اتصال البوت بالروم
  distube.on('disconnect', queue => {
    if (queue?.textChannel) {
      const embed = new EmbedBuilder()
        .setDescription('🔌 تم فصل اتصال البوت بالروم الصوتي.')
        .setColor('#ED4245');

      queue.textChannel.send({ embeds: [embed] }).catch(console.error);
    }
  });
};
