module.exports = {
  name: "shuffle",
  category: "ytdl",
  description: "現在流れている曲以外のキューをシャッフルします。",
  run: (client, message, args) => {
    for (let i = client.queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i + 1);
      [client.queue[i],
        client.queue[j]] = [client.queue[j],
        client.queue[i]];
      [client.queue_titles[i],
        client.queue_titles[j]] = [client.queue_titles[j],
        client.queue_titles[i]];
      [client.queue_second[i],
        client.queue_second[j]] = [client.queue_second[j],
        client.queue_second[i]];
      [client.queue_author[i],
        client.queue_author[j]] = [client.queue_author[j],
        client.queue_author[i]];
    }
    message.channel.send("キューをシャッフルしたぞ！！");
  }
}