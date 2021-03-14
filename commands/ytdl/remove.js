const Discord = require("discord.js");
const {
  playmusic
} = require("../../functions.js");
module.exports = {
  name: "remove",
  abb: ["delete",
    "rm"],
  category: "ytdl",
  description: "指定された順番の曲をプレイリストから削除するぞ！",
  run: (client, message, args) => {
    if (message.member.voice.channel) {
      let i = parseInt(args[0], 10);
      if (client.queue.length != 0) {
        if (!isNaN(i)) {
          if (i == 0) {
            message.member.voice.channel.join()
            .then(connection=> {
              client.queue.shift();
              client.queue_author.shift();
              client.queue_second.shift();
              client.queue_titles.shift();
              if (client.queue.length == 0) {
                connection.disconnect();
              } else {
                playmusic(client, connection);
              }
            })
            .catch(e=> {
              console.log(e);
            });
          } else {
            let queue = client.queue.splice(i, i);
            let author = client.queue_author.splice(i, i);
            let second = client.queue_second.splice(i, i);
            let title = client.queue_titles.splice(i, i);
            let sum = 0;
            client.queue_second.forEach(sec=> {
              let mmss = sec.split(':');
              sum += parseInt(mmss[0], 10)*60+parseInt(mmss[1], 10)
            });
            const embed = new Discord.MessageEmbed()
            .setDescription("__Remove__:\n["+title+"]("+queue+")| "+second+"\nby:"+author)
            .setFooter(((client.loop == 1)?"🔂": (client.loop == 2)?"🔁": "▶️")+"残り 全"+client.queue.length+"曲 | total: "+Math.floor(sum/60)+":"+('00'+sum%60).slice(-2));
            message.channel.send(embed);
          }
        } else {
          if (typeof args[0] == "undefined") {
            i = client.queue.length-1;
            if (i == 0) {
              message.member.voice.channel.join()
              .then(connection=> {
                client.queue.shift();
                client.queue_author.shift();
                client.queue_second.shift();
                client.queue_titles.shift();
                if (client.queue.length == 0) {
                  connection.disconnect();
                } else {
                  playmusic(client, connection);
                }
              })
              .catch(e=> {
                console.log(e);
              });
            } else {
              let queue = client.queue.splice(i, i);
              let author = client.queue_author.splice(i, i);
              let second = client.queue_second.splice(i, i);
              let title = client.queue_titles.splice(i, i);
              let sum = 0;
              client.queue_second.forEach(sec=> {
                let mmss = sec.split(':');
                sum += parseInt(mmss[0], 10)*60+parseInt(mmss[1], 10)
              });
              const embed = new Discord.MessageEmbed()
              .setDescription("__Remove__:\n["+title+"]("+queue+")| "+second+"\nby:"+author)
              .setFooter(((client.loop == 1)?"🔂": (client.loop == 2)?"🔁": "▶️")+"残り 全"+client.queue.length+"曲 | total: "+Math.floor(sum/60)+":"+('00'+sum%60).slice(-2));
              message.channel.send(embed);
            }
          } else {
            message.channel.send('削除する曲の順番を指定してくれよな！！');
          }
        }
      } else {
        message.channel.send("キューに曲が登録されてないぞ？");
      }
    } else {
      message.channel.send('ボイスチャンネルに参加してないぞ？');
    }
  }
}