const {
  Client,
  Collection
} = require('discord.js');
const fs = require('fs');

const client = new Client({
  disableEveryone: true,
});
client.commands = new Collection();
client.abbs = new Collection();
client.categorys = new Array();

client.loop = new Number;
client.queue = new Array();
client.queue_titles = new Array();
client.queue_second = new Array();
client.queue_author = new Array();
client.loop = 0;
const PORT = process.env.PORT;

// Run the command loader
['command'].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});


client.on('ready', () => {
  console.log('botを正常に起動しました');
  client.user.setActivity('BOTが正常に起動したよ！', { type: 'PLAYING' });
}

client.on('message', async(message) => {
  const prefix = 'm!';


  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  var command = client.commands.get(cmd);
  if (client.abbs.get(cmd)) {
    command = client.abbs.get(cmd);
  }

  // If a command is finally found, run the command
  if (command) {
    try {
      if (!message.member) message.member = await message.guild.fetchMember(message);
      await command.run(client, message, args);
    } catch (e) {
      message.channel.send(`コマンドファイルエラー:${e}`);
      console.log(e);
    }
  }
});

client.login(process.env.BOT_TOKEN);