const Discord = require("discord.js");
const search = require('youtube-search');
const opts = {
  maxResults: 10,
  key: 'AIzaSyAhuqxT3A-SZ7uALuO2fhqQ3OqWJJyZHGc',
  type: 'video'
}
module.exports = {
  name: "search",
  category: "ytdl",
  description: "youtubeで検索をかけるぞ！",
  run: (client, message, args) => {
    let keyword = args.join(" ");
    search(keyword, opts, function(err, results) {
      let titles = "";
      let i = 0;
      results.forEach(result => {
        i++;
        titles += i + ". " + result.title+"\n";
      });
      message.channel.send(titles);
    });
  }
}