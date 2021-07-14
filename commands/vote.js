const VoteClass = require('../classes/vote.js')
const Singleton = require('../classes/singleton')

module.exports = {
  //static votes = []

  /*
  static match(msg){
    return msg.content.startsWith(Command.prefix + 'vote') || msg.content.startsWith(Command.prefix + 'v')
  }*/

  name: 'vote',
  aliases: ['v'],

  action(msg) {

    if (!(msg.channel instanceof Discord.DMChannel)) {

      var channel = msg.channel
      var text = msg.content.split(" ")
      msg.delete()
      text.shift()

      try {
        if (isNaN(text[0].replace('m', ''))) {
          throw 'Duration is not a number'
        }
        if (text[0].includes('m')) {
          var duration_arr = text[0].split('m')
          if (!(duration_arr[1] === ''))
            var duration_res = (parseInt(duration_arr[0]) * 60 * 1000) + (parseInt(duration_arr[1]) * 1000)
          else
            var duration_res = (parseInt(duration_arr[0]) * 60 * 1000)
        } else
          var duration_res = parseInt(text[0]) * 1000

        const duration = duration_res > 0 ? duration_res : 1

        text.shift()
        text = text.join(" ")

        const vote = new VoteClass(msg.author, text)

        channel.send('***' + text + '***\nDurée du sondage: ' + Singleton.millisToMinutesAndSeconds(duration) + '\nAuteur: <@' + msg.author.id + '>').then(m => {
          m.react('👍')
          m.react('👎')

          const filter = (reaction, user) => !(user.id === m.author.id)

          const collector = m.createReactionCollector(filter, {
            time: duration
          })
          collector.on('collect', function (r, u) {
            if (!(r.emoji.name === '👍' || r.emoji.name === '👎')) {
              r.remove()
            } else {
              r.emoji.name === '👍' ? vote.vote(u, true) : vote.vote(u, false)
              r.users.remove(u)
            }
          })
          collector.on('end', function (collected, reason) {
            m.channel.send(vote.result())
            m.delete()
          })
        })
      } catch (error) {
        msg.reply('Syntaxe invalide, exemple d\'utilisation: `' + Singleton.prefix + 'vote 5m30 Aimez-vous la couleur rouge ?`, pour plus de détails, faire la commande `' + Singleton.prefix +
          'help`')
      }
    }
  }

}