const { Message } = require("discord.js");

module.exports = {
 name: "omikuji",
 category: "game",
 description: "おみくじコマンドです。一日一回までですよ？",
 abb: "omi",
     run: (client, message, args) => {
    var omikuji = Math.floor( Math.random() * (7 + 1 - 1) ) + 1 ;
    if ( omikuji == 1 ) { message.channel.send("大凶ですよ.....。運の使い過ぎには気を付けてください....。")}
    if ( omikuji == 2 ) { message.channel.send("凶ですね。よくないことが起きちゃうかもしれません。調子の乗りすぎには気を付けて....")}
    if ( omikuji == 3 ) { message.channel.send("末吉です。もうちょっと努力をしましょうね。")}
    if ( omikuji == 4 ) { message.channel.send("中吉です。すこしばかりいいことが起きるかもしれませんね。")}
    if ( omikuji == 5 ) { message.channel.send("小吉です。ん～。何とも言えませんね。")}
    if ( omikuji == 6 ) { message.channel.send("吉です。いいことが起きるかもしれません。いい努力を続けましょう。")}
    if ( omikuji == 7 ) { message.channel.send("大吉です。おめでとうございます。きっといいことが起きますよ。")}
     }
 }