module.exports = {
    name: "m-time",
    category: "minecraft-addon-support",
    description: "variableタイマーを作成します。m!m-time `時間(tick)`",
    run: (client, message, args) => {
        if (!message.author.bot) {
            if (isNaN(args[0]) == false) {
                message.channel.send(`variable.time = variable.time < ${args[0]} ? variable.time + 1:0; return variable.time == 0;`);
            } else {
                message.channel.send("\`!m-time [数値]\`で実行してね!!")
            }
        }
    }
}