const {
  uuid,
  rnd
} = require("../../functions.js");

module.exports = {
  name: "e",
  description: "",
  run: async(client, message) => {
    let author = message.author.username;
    if (!message.author.bot) {
      if (message.member.roles.cache.some(role => role.name === "eval-Authority")) {
        var evalcommand = message.content.slice(3, message.content.length);
        try {
          await eval(evalcommand);
          console.log(`eval:${evalcommand}\nby:${author}`);
        } catch (errormessage) {
          message.channel.send(`エラーメッセージだよ:\`${errormessage.message}\``);
          console.log(`eval:${evalcommand}=>Error:${errormessage.message}\nby:${author}`);
        }
      } else {
        message.channel.send("エラーメッセージ:evalコマンドの実行権限が無い状態で使おうとしたよ!");
        console.log(`eval:${evalcommand}=>Error:evalの実行権限を持っていなかった\nby:${author}`);
      }
    } else {
      message.channel.send("エラーメッセージ:botがevalコマンドを実行しようとしたよ");
      console.log(`eval:${evalcommand}=>Error:botが実行しようとした\nby:${author}`);
    }
  }
}