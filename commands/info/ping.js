const Discord = require("discord.js");
module.exports = {
  name: "ping",
  description: "サーバーとの接続時間を調べる",
  run: (client, message, args) => {
    message.channel.send(`🏓 Pinging....`).then((msg) => {
      const _ = new Discord.MessageEmbed()
      .setTitle("Pong!")
      .setDescription(
        `🏓 Pong!\nLatency is ${Math.floor(
          msg.createdTimestamp - message.createdTimestamp
        )}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`
      )
      .setColor("RANDOM");
      msg.edit(_);
      msg.edit("\u200B");
    });
  }
}