const Discord = require("discord.js");
module.exports = {
  name: "loop",
  category: "ytdl",
  description: "今の曲をループするぞ！",
  run: (client, message, args) => {
    if (message.member.voice.channel) {
      if (message.member.voice.channel) {
        if (client.loop != 1) {
          client.loop = 1;
          message.channel.send('1曲ループを有効化したぞ！！');
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