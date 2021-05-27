const Discord = require('discord.js')
require('dotenv').config()
const bot = new Discord.Client()
const Help = require('./commands/help')
const Hot = require('./commands/hot')
const Vote = require('./commands/vote')
const Tg = require('./commands/tg')
const Scream = require('./commands/scream')
const Ping = require('./commands/ping')
const checkVideo = require('./classes/checkVideo')

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

bot.on("ready", () => {
  bot.user.setPresence({ activity: { name: '_help', type: 3 }, status: 'available' })})


function checkCommand(msg){
  if (!(msg.channel instanceof Discord.DMChannel))
    var commandUsed = Ping.parse(msg) || Scream.parse(msg) || Tg.parse(msg) || Vote.parse(msg) || Help.parse(msg)
  else
    var commandUsed = Ping.parse(msg) || Scream.parse(msg) || Tg.parse(msg) || Help.parse(msg)
}

bot.on('message', function(msg) {

  if (msg.attachments.size > 0){
    (async function(){

    await checkVideo((msg.attachments).array()[0].url)

    })().then((resolve) => {
      //console.log("then safe")
      checkCommand(msg)
    }).catch((reject) => {
      //console.log("then reject")
      msg.reply("Interdiction d'envoyer ce genre de contenu (crash vidéo/gif)")
      msg.delete()
    })

    if (validURL(msg.content) && !msg.content.includes("youtube.com")){
      (async function(){

        await checkVideo(msg.content)
    
        })().then((resolve) => {
          //console.log("then safe")
          checkCommand(msg)
        }).catch((reject) => {
          //console.log("then reject")
          msg.reply("Interdiction d'envoyer ce genre de contenu (crash vidéo/gif)")
          msg.delete()
        })
    }

  } else {
    checkCommand(msg)
  }

})

bot.login(process.env.BOT_LOGIN)
