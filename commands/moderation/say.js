const {
  MessageEmbed
} = require("discord.js");
let roleColor = "";
module.exports = {
  name: "say",
  description: "/say `文字`でオイラが喋るぞ！\n/say embed `文字`にするとrichembedで送るぞ！",
  usage: "<input>",
  run: (client, message, args) => {
    message.delete({
      timeout: 1
    });
    if (args.length <= 0)
      return (message.reply("何も喋らせないの？")).then(m => m.delete({
      timeout: 3000
    }));
    try {
      roleColor = message.member.displayHexColor;
    } catch (e) {
      roleColor = "#000000";
    }

    if (args[0] === "embed") {
      const embed = new MessageEmbed()
      .setDescription(args.slice(1).join(" "))
      .setColor(roleColor === "#000000" ? "#ffffff": roleColor);

      message.channel.send(embed);
    } else {
      message.channel.send(args.join(" "));
    }
  }
}