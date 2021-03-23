const {
  rnd
} = require("../../functions.js");
module.exports = {
  name: "omikuji",
  category: "game",
  description: "おみくじコマンドです。一日一回までですよ？",
  abb: ["omi"],
  run: (client, message, args) => {
    switch (rnd) {
      case 1:
        message.channel.send("大凶ですよ.....。運の使い過ぎには気を付けてください....。");
        break;
      case 2:
        message.channel.send("凶ですね。よくないことが起きちゃうかもしれません。調子の乗りすぎには気を付けて....");
        break;
      case 3:
        message.channel.send('末吉です。もうちょっと努力をしましょうね');
        break;
      case 4:
        message.channel.send("中吉です。すこしばかりいいことが起きるかもしれませんね。");
        break;
      case 5:
        message.channel.send("小吉です。ん～。何とも言えませんね。");
        break;
      case 6:
        message.channel.send("吉です。いいことが起きるかもしれません。いい努力を続けましょう");
        break;
      case 7:
        message.channel.send("大吉です。おめでとうございます。きっといいことが起きますよ。");
        break;

      //エラー表示がほとんど出てます。


    }
  }
}