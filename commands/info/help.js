const {
  MessageEmbed
} = require("discord.js");
var i = 0;
module.exports = {
  name: "help",
  description: "helpコマンドです。\n各コマンドの略語はm!help `コマンド名`で確認できます",
  run: (client, message, args) => {
    if (typeof args[0] != "undefined") {
      const cmd = args[0].toLowerCase();
      var command = client.commands.get(cmd);
      if (client.abbs.get(cmd)) {
        command = client.abbs.get(cmd);
      }
      if (command) {
        if (command.description == "") {
          message.channel.send("どこでそのコマンドを知ったのかな？");
          return;
        }
        let abbs_description = "";
        if (typeof command.abb != "undefined") {
          command.abb.forEach(abb=> {
            abbs_description += "`m!"+abb+"` ";
          });
        }
        const embed = new MessageEmbed()
        .setTitle('__取説__')
        .setDescription("**m!" + command.name + "**" + "\n> " + command.description.replace(/\n/g, "\n> ") + ((abbs_description != "")?("\n> 略語:"+abbs_description): ""));
        message.channel.send(embed);
      } else {
        message.channel.send("そのようなコマンドはありません");
      }
      return;
    }
    i = 0;
    let commands_description = "";
    client.commands.forEach(command => {
      if (client.categorys[i] != command.category)return;
      if (command.description == "") {
        return;
      }
      commands_description += "**m!" + command.name + "**" + "\n> " + command.description.replace(/\n/g, "\n> ") + "\n";
    });
    const embed = new MessageEmbed()
    .setTitle('__取説:__**'+client.categorys[i]+'**')
    .setDescription(commands_description);
    message.channel.send(embed).then((msg)=> {
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
          i--;
        } else {
          i++;
        }
        if (i < 0) {
          i = 0;
          return;
        }
        if (i > (client.categorys.length-1)) {
          i = client.categorys.length-1;
          return;
        }
        let commands_description = "";
        client.commands.forEach(command => {
          if (client.categorys[i] != command.category)return;
          if (command.description == "") {
            return;
          }
          commands_description += "**m!" + command.name + "**" + "\n> " + command.description.replace(/\n/g, "\n> ") + "\n";
        });
        const embed = new MessageEmbed()
        .setTitle('__取説:__**'+client.categorys[i]+'**')
        .setDescription(commands_description);
        msg.edit(embed);
      });
      collector.on('remove', collected => {
        if (collected.emoji.name === '◀️') {
          i--;
        } else {
          i++;
        }
        if (i < 0) {
          i = 0;
          return;
        }
        if (i > (client.categorys.length-1)) {
          i = client.categorys.length-1;
          return;
        }
        let commands_description = "";
        client.commands.forEach(command => {
          if (client.categorys[i] != command.category)return;
          if (command.description == "") {
            return;
          }
          commands_description += "**m!" + command.name + "**" + "\n> " + command.description.replace(/\n/g, "\n> ") + "\n";
        });
        const embed = new MessageEmbed()
        .setTitle('__取説:__**'+client.categorys[i]+'**')
        .setDescription(commands_description);
        msg.edit(embed);
      });
      collector.on('end',
        () => {
          msg.reactions.removeAll();
        });
    });
  }
}