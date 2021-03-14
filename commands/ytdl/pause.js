const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const {
  playmusic
} = require("../../functions.js");
module.exports = {
  name: "pause",
  category: "ytdl",
  description: "一時停止と解除コマンドだぞ！",
  run: (client, message, args) => {
    if (message.member.voice.channel) {
      message.member.voice.channel.join()
      .then(connection=> {
        if (connection.dispatcher.paused) {
          connection.dispatcher.resume();
          message.channel.send('▶️一時停止を解除したぞ!!');
        } else {
          connection.dispatcher.pause();
          message.channel.send('⏸️一時停止したぞ！！');
        }
      })
      .catch(e=> {
        console.log(e);
      });
    } else {
      message.channel.send('ボイスチャンネルに参加してないぞ？');
    }
  }
}