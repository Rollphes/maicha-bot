const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const {
  playmusic
} = require("../../functions.js");
module.exports = {
  name: "skip",
  abb: ["s"],
  category: "ytdl",
  description: "次の曲にスキップするぞ！！",
  run: (client, message, args) => {
    if (message.member.voice.channel) {
      if (client.queue.length != 0) {
        message.member.voice.channel.join()
        .then(connection=> {
          if (client.loop == 2) {
            client.queue.push(client.queue[0]);
            client.queue_author.push(client.queue_author[0]);
            client.queue_second.push(client.queue_second[0]);
            client.queue_titles.push(client.queue_titles[0]);
            client.queue.shift();
            client.queue_author.shift();
            client.queue_second.shift();
            client.queue_titles.shift();
          }
          if (client.loop == 0) {
            client.queue.shift();
            client.queue_author.shift();
            client.queue_second.shift();
            client.queue_titles.shift();
          }
          if (client.queue.length == 0) {
            connection.disconnect();
          } else {
            if (client.queue_titles[0] != "") {
              let sum = 0;
              client.queue_second.forEach(sec=> {
                var mmss = sec.split(':');
                sum += parseInt(mmss[0], 10)*60+parseInt(mmss[1], 10)
              });
              const embed = new Discord.MessageEmbed()
              .setDescription("⏭️__NEXT__:\n["+client.queue_titles[0]+"]("+client.queue[0]+")| "+client.queue_second[0]+"\nby:"+client.queue_author[0])
              .setFooter("全"+client.queue.length+"曲 | total: "+Math.floor(sum/60)+":"+('00'+sum%60).slice(-2));
              message.channel.send(embed);
            }
            playmusic(client, connection);
          }
        })
        .catch(e=> {
          console.log(e);
        });
      } else {
        message.channel.send('ボイスチャンネルに参加してないぞ？');
      }
    } else {
      message.channel.send("キューに曲が登録されてないぞ？");
    }
  }
}