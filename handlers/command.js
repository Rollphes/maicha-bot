const {
  readdirSync
} = require("fs");


module.exports = (client) => {

  readdirSync("./commands/").forEach(dir => {

    const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

    if (client.categorys.includes(dir) == false) {
      client.categorys.push(dir);
    }

    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);

      if (pull.name) {
        pull.category = dir;
        client.commands.set(pull.name, pull);
        if (typeof pull.abb != "undefined") {
          pull.abb.forEach(abb=> {
            client.abbs.set(abb, pull);
          });
        }
      } else {
        console.log(`コマンド名が設定されていないファイルがあります。`);
        continue;
      }

    }
  });
}

/**
* This is the basic command layout
* module.exports = {
*  name: "Command name",
*  description: "Command description"
*  abb: "[args input]",
*  run: (client, message, args) => {
*      The code in here to execute
*  }
* }
*/