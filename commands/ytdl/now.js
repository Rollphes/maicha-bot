const Discord = require('discord.js');
module.exports = {
  name: "now",
  category: "ytdl",
  description: "今流れている曲の情報を出力します。",
  run: (client, message, args) => {
    if (client.queue != []) {
      let sum = 0;
      client.queue_second.forEach(sec=> {
        var mmss = sec.split(':');
        sum += parseInt(mmss[0], 10)*60+parseInt(mmss[1], 10)
      });
      const embed = new Discord.MessageEmbed()
      .setDescription("__Now Playing__:\n["+client.queue_titles[0]+"]("+client.queue[0]+")| "+client.queue_second[0]+"\nby:"+client.queue_author[0])
      .setFooter(((client.loop == 1)?"🔂": (client.loop == 2)?"🔁": "▶️")+"全"+client.queue.length+"曲 | total: "+Math.floor(sum/60)+":"+('00'+sum%60).slice(-2));
      message.channel.send(embed);
    } else {
      message.channel.send("キューに曲が登録されてないぞ？");
    }
  }
}