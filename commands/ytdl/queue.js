const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var n = 0;
module.exports = {
  name: "queue",
  abb: ["q"],
  category: "ytdl",
  description: "プレイリストを表示するぞ！",
  run: async(client, message, args) => {
    if (client.queue.length != 0) {
      let sum = 0;
      n = 0;
      client.queue_second.forEach(sec=> {
        var mmss = sec.split(':');
        sum += parseInt(mmss[0], 10)*60+parseInt(mmss[1], 10)
      });
      const embed = new Discord.MessageEmbed()
      .setDescription(get_queue(n*10, client))
      .setFooter(((client.loop == 1)?"🔂": (client.loop == 2)?"🔁": "▶️")+"全"+client.queue.length+"曲 | total: "+Math.floor(sum/60)+":"+('00'+sum%60).slice(-2));
      message.channel.send(embed).then((msg)=> {
        if (client.queue.length < 11)return;
        msg.react('◀️').then(() => msg.react('▶️'));
        const collector = msg.createReactionCollector((reaction, user) => {
          return ['◀️',
            '▶️',].includes(reaction.emoji.name)&&!user.bot;
        }, {
          time: 60000,
          dispose: true
        });
        collector.on('collect', collected => {
          if (collected.emoji.name === '◀️') {
            n--;
          } else {
            n++;
          }
          if (n < 0) {
            n = 0;
            return;
          }
          if (n > Math.floor((client.queue.length-1)/10)) {
            n = Math.floor((client.queue.length-1)/10);
            return;
          }
          var embed = new Discord.MessageEmbed()
          .setDescription(get_queue(n*10, client))
          .setFooter(((client.loop == 1)?"🔂": (client.loop == 2)?"🔁": "▶️")+"全"+client.queue.length+"曲 | total: "+Math.floor(sum/60)+":"+('00'+sum%60).slice(-2));
          msg.edit(embed);
        });
        collector.on('remove',
          collected => {
            if (collected.emoji.name === '◀️') {
              n--;
            } else {
              n++;
            }
            if (n < 0) {
              n = 0;
              return;
            }
            if (n > Math.floor((client.queue.length-1)/10)) {
              n = Math.floor((client.queue.length-1)/10);
              return;
            }
            var embed = new Discord.MessageEmbed()
            .setDescription(get_queue(n*10, client))
            .setFooter(((client.loop == 1)?"🔂": (client.loop == 2)?"🔁": "▶️")+"全"+client.queue.length+"曲 | total: "+Math.floor(sum/60)+":"+('00'+sum%60).slice(-2));
            msg.edit(embed);
          });
        collector.on('end',
          () => {
            msg.reactions.removeAll();
          });
      });
    } else {
      message.channel.send("キューに何も登録されてないぞ！！");
    }
  }
}
function get_queue(i, client) {
  var queues = "";
  client.queue_titles.some(result => {
    if (i == 0) {
      queues += "__Now Playing__:\n["+client.queue_titles[0]+"]("+client.queue[0]+")| "+client.queue_second[0]+"\nby:"+client.queue_author[0];
    } else {
      if (i == 1 || i == n*10) {
        queues += "\n\n__NEXT__\n";
      }
      queues += i+".["+client.queue_titles[i]+"]("+client.queue[i]+")| "+client.queue_second[i]+"\nby:"+client.queue_author[i]+"\n\n";
    }
    i++;
    if (i == (n*10+10))return 1;
    if (client.queue.length == i)return 1;
  });
  return queues;
}