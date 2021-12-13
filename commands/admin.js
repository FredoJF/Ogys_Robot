const Singleton = require("../classes/singleton");

module.exports = {
  name: "admin",

  action(msg) {
    var args = msg.content.slice(Singleton.prefix.length).trim().split(/ +/);
    args.shift();

    let admin_id = "undefined";

    Object.values(Singleton.guildinfos).forEach((guild) => {
      if (msg.guild.id == guild.id) {
        admin_id = guild.admin_id;
      }
    });

    if (msg.author.id == admin_id)
      if (args[0] == "clearchannel" || args[0] == "clear") {
        msg.channel.clone();
        msg.channel.delete();
      }
  },
};
