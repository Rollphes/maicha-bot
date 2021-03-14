const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
const search = require('youtube-search');
const {
  playmusic
} = require("../../functions.js");
const opts = {
  maxResults: 1,
  key: 'AIzaSyAhuqxT3A-SZ7uALuO2fhqQ3OqWJJyZHGc',
  type: 'video'
}
var i = 0;
module.exports = {
  name: "play",
  abb: ["p"],
  category: "ytdl",
  description: "曲を再生するぞ！！",
  run: async (client, message, args) => {
    let url = "";
    i = 0;
    if (message.member.voice.channel) {
      if (typeof args[0] == "undefined") {
        message.channel.send("urlか検索ワードを書いてくれよな！！\nHint:/play `urlか検索ワード`");
        return;
      }
      if ((args[0]).match(/^http(s)?:\/\//gm) == null) {
        let keyword = args.join(" ");
        let results = await search(keyword, opts);
        url = results.results[0].link;
      } else {
        if ((args[0]).match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/+/gm) == null) {
          message.channel.send("これはyoutubeのurlじゃないぞ？");
          return;
        }
        if ((args[0]).match(/playlist\?/gm) != null) {
          if (ytpl.validateID(args[0]) == false) {
            message.channel.send("⚠プレイリストを取得出来ませんでした。");
            return;
          }
          ytpl(args[0]).then(playlist=> {
            ytpl_add(playlist, client, message);
          });
          return;
        }
        url = args[0];
      }
      if (ytdl.validateURL(url) == false) {
        message.channel.send("⚠動画の取得が出来なかったぞ！！");
        return;
      }
      client.queue.push(url);
      ytdl.getInfo(url).then(info=> {
        client.queue_titles.push(info.videoDetails.title);
        client.queue_second.push(Math.floor(info.videoDetails.lengthSeconds/60)+":"+('00'+info.videoDetails.lengthSeconds%60).slice(-2));
        client.queue_author.push(message.author.tag);
        let sum = 0;
        client.queue_second.forEach(sec=> {
          var mmss = sec.split(':');
          sum += parseInt(mmss[0], 10)*60+parseInt(mmss[1], 10)
        });
        let len = client.queue.length-1;
        const embed = new Discord.MessageEmbed()
        .setDescription("__Add__:\n["+client.queue_titles[len]+"]("+client.queue[len]+")| "+client.queue_second[len]+"\nby:"+client.queue_author[len])
        .setThumbnail(info.videoDetails.thumbnail.thumbnails[info.videoDetails.thumbnail.thumbnails.length-1].url)
        .setFooter(((client.loop == 1)?"🔂": (client.loop == 2)?"🔁": "▶️")+"全"+client.queue.length+"曲 | total: "+Math.floor(sum/60)+":"+('00'+sum%60).slice(-2));
        message.channel.send(embed);
      });
      if (client.queue.length == 1) {
        message.member.voice.channel.join()
        .then(connection=> {
          playmusic(client, connection);
        })
        .catch(e=> {
          console.log(e);
        });
      }
    } else {
      message.channel.send('ボイスチャンネルに参加してないぞ？');
    }
  }
}
function ytpl_add(playlist, client, message) {
  client.queue.push(playlist.items[i].url);
  client.queue_titles.push(playlist.items[i].title);
  client.queue_second.push(playlist.items[i].duration);
  client.queue_author.push(message.author.tag);
  if (client.queue.length == 1) {
    message.member.voice.channel.join()
    .then(connection=> {
      playmusic(client, connection);
    })
    .catch(e=> {
      console.log(e);
    });
  }
  i++;
  if (i < playlist.items.length) {
    ytpl_add(playlist, client, message);
  } else {
    let sum = 0;
    client.queue_second.forEach(sec=> {
      var mmss = sec.split(':');
      sum += parseInt(mmss[0], 10)*60+parseInt(mmss[1], 10)
    });
    let len = client.queue.length-1;
    const embed = new Discord.MessageEmbed()
    .setDescription("__Add__:\n["+playlist.title+"]("+playlist.url+")\n曲数:"+playlist.items.length+"\nby:"+message.author.tag)
    .setThumbnail(playlist.bestThumbnail.url)
    .setFooter(((client.loop == 1)?"🔂": (client.loop == 2)?"🔁": "▶️")+"全"+client.queue.length+"曲 | total: "+Math.floor(sum/60)+":"+('00'+sum%60).slice(-2));
    message.channel.send(embed);
  }
}