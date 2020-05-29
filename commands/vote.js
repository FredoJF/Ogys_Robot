const Command = require('./command.js')
const VoteClass = require('../classes/vote.js')

module.exports = class Vote extends Command {
  //static votes = []
  
  static match(msg){
    return msg.content.startsWith(Command.prefix + 'vote')
  }
  
  static action(msg){
    var channel = msg.channel
    var text = msg.content.split(" ")
    msg.delete()
    text.shift()
    
    if (!isNaN(text[0].replace('m', ''))){
      if (text[0].includes('m')){
        var duration_arr = text[0].split('m')
        if (duration_arr.length > 2)
        var duration_res = (parseInt(duration_arr[0]) * 60 * 1000) + (parseInt(duration_arr[1]) * 1000)
        else
        var duration_res = (parseInt(duration_arr[0]) * 60 * 1000)
      } else
      var duration_res = parseInt(text[0]) * 1000
      
      const duration = duration_res > 0 ? duration_res : 1
      
      text.shift()
      text = text.join(" ")
      
      const vote = new VoteClass(msg.author, text)
      
      channel.send(text).then(m => {
        m.react('👍')
        m.react('👎')
        
        const filter = (reaction, user) =>  !(user.id === m.author.id)
        
        const collector = m.createReactionCollector(filter, { time: duration })
        collector.on('collect', function(r, u) {
          if (!(r.emoji.name === '👍' || r.emoji.name === '👎')){
            r.remove()
          } else{
            r.emoji.name === '👍' ? vote.vote(u, true) : vote.vote(u, false)
          }
        })
        collector.on('end', function(collected, reason){ m.channel.send(vote.result()) })
      })
    } else {
      msg.reply('Syntaxe invalide, exemple d\'utilisation: `' + Command.prefix + 'vote 5m30 Aimez-vous la couleur rouge ?`, pour plus de détails, faire la commande `' + Command.prefix
      + 'help`')
    }
  }
  
  
}
