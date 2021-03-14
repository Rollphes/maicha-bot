const ytdl = require("ytdl-core");
module.exports = {
  uuid: () => {
    var uuid = "",
    i,
    random;
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;

      if (i == 8 || i == 12 || i == 16 || i == 20) {
        uuid += "-"
      }
      uuid += (i == 12 ? 4: (i == 16 ? (random & 3 | 8): random)).toString(16);
    }
    return uuid;
  },
  rnd: (max, min)=> {
    max--;
    min++;
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  },
  playmusic: (client, connection)=> {
    play(client, connection);
  }
}
function play(client, connection) {
  let dispatcher = connection.play(ytdl(client.queue[0], {
    filter: 'audioonly'
  }));
  dispatcher.on('finish',
    ()=> {
      if (client.loop == 0) {
        client.queue.shift();
        client.queue_author.shift();
        client.queue_second.shift();
        client.queue_titles.shift();
      }
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
      if (client.queue.length == 0) {
        connection.disconnect();
      } else {
        play(client, connection);
      }
    });
}