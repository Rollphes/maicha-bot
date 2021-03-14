const Discord = require("discord.js");
module.exports = {
  name: "disconnect",
  abb: ["dc"],
  category: "ytdl",
  description: "通話から退室するぞ！",
  run: (client, message, args) => {
    if (message.member.voice.channel) {
      message.member.voice.channel.join()
      .then(connection=> {
        connection.disconnect();
        client.queue = [];
        client.queue_second = [];
        client.queue_author = [];
        client.queue_titles = [];
        client.loop = 0;
        message.channel.send('またなー!');
      })
      .catch(e=> {
        console.log(e);
      });
    } else {
      message.channel.send('ボイスチャンネルに参加してないぞ？');
    }
  }
}