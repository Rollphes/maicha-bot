const { uuid } = require("../../functions.js");
const fs = require("fs");
module.exports = {
    name: "m-r",
    category: "minecraft-addon-support",
    description: "resourceのmanifestを作成します。m!m-r `name` `description` という感じで引数を指定できます。引数の指定がない場合undefinedが代入されます。min_engine_versionは要求最低エンジンバージョンです。特定のコマンドが新バージョンで変更された場合に、そのmin_engine_versionはそのコマンドの前の機能を使いたい場合にそのコマンドの前バージョンがあるバージョンに変更してください。これは消しても多分大丈夫です。",
    run: (client, message, args) => {
        if (args[1] == null) {
            args[1] = "undefined";
        }
        if (args[0] == null) {
            args[0] = "undefined";
        }
        fs.writeFileSync(`manifest.json`, `{\n    "format_version": 1,\n    "header": {\n        "description": "${args[1]}",\n        "name": "${args[0]}",\n        "uuid": "${uuid()}",\n        "version": [0, 0, 1]\n  "min_engine_version": [1, 2, 6] \n  },\n    "modules": [{\n        "description": "${args[1]}",\n        "type": "resources",\n        "uuid": "${uuid()}",\n        "version": [0, 0, 1]\n    }]\n}`, 'utf8');
        message.channel.send(`resource`, { files: [`manifest.json`] })
            .then(() => { fs.unlinkSync(`manifest.json`); });
    }
}
