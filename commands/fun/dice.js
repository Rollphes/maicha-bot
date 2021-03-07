const {
  rnd
} = require("../../functions.js");
module.exports = {
  name: "dice",
  description: "1d100の場合/dice 1 100 を実行",
  run: (client, message, args) => {
    let result = "";
    if (isNaN(args[0]) || isNaN(args[1])) {
      message.channel.send("数値を入力してね");
      return;
    }
    for (i = 1; i <= args[0]; i++) {
      result += rnd(1, args[1])+" ";
    }
    message.channel.send(result);
  }
}