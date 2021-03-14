const Discord = require("discord.js");
module.exports = {
  name: "queueloop",
  abb: ["qloop"],
  category: "ytdl",
  description: "全曲をループするぞ！",
  run: (client, message, args) => {
    if (message.member.voice.channel) {
      if (message.member.voice.channel) {
        if (client.loop < 2) {
          client.loop = 2;
          message.channel.send('全曲ループを有効化したぞ！！');
        } else {
          client.loop = 0;
          message.channel.send('通常再生にしたぞ！！');
        }
      }
    } else {
      message.channel.send('ボイスチャンネルに参加してないぞ？');
    }
  }
}