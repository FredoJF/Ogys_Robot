module.exports = {
  name: "coinflip",
  aliases: ["cf"],

  action(msg) {
    var x = Math.floor(Math.random() * 2);
    if (x == 0) msg.reply("Face.");
    else msg.reply("Pile.");
  },
};
