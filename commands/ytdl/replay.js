const Discord = require("discord.js");
module.exports = {
  name: "replay",
  category: "ytdl",
  description: "今流れている曲をキューの1番最後に追加するぞ！！",
  run: (client, message, args) => {
    if (message.member.voice.channel) {
      client.queue.push(client.queue[0]);
      client.queue_author.push(client.queue_author[0]);
      client.queue_second.push(client.queue_second[0]);
      client.queue_titles.push(client.queue_titles[0]);
      message.channel.send('今流れている曲を追加したぞ！');
    } else {
      message.channel.send('ボイスチャンネルに参加してないぞ？');
    }
  }
}