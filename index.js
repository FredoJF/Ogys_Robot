const Discord = require('discord.js')
const bot = new Discord.Client()
const Help = require('./commands/help')
const Hot = require('./commands/hot')
const Vote = require('./commands/vote')
const Tg = require('./commands/tg')

bot.on("ready", () => {
  bot.user.setActivity("_help", { type: "WATCHING" })})

bot.on('message', function(msg) {
  if (!(msg.channel instanceof Discord.DMChannel))
    var commandUsed = Hot.parse(msg) || Tg.parse(msg) || Vote.parse(msg) || Help.parse(msg)
  else
    var commandUsed = Tg.parse(msg) || Help.parse(msg)
})

bot.login('NzA2NDEwNjEyOTM0MDQ5ODIz.Xq52Rg.9N4Ipau0-rXavO6Ir-UK4A974Gg')
