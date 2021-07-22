const Hot = require('../classes/hot')
const Discord = require('discord.js')
const Singleton = require('../classes/singleton')

module.exports = {

  name: 'hot',
  aliases: ['cote'],

  action(msg) {

    if (!(msg.channel instanceof Discord.DMChannel)) {

      var args = msg.content.slice(Singleton.prefix.length).trim().split(/ +/)
      args.shift()

      //console.log(args[0])
      //console.log(msg.mentions.users.first())

      //console.log(args.length + "  " + typeof msg.mentions.users.first() + "  " + "<@!" + msg.mentions.users.first().id + ">")

      if (args.length > 1 && typeof msg.mentions.users.first() !== 'undefined' && args[0].includes(msg.mentions.users.first().id) && msg.mentions.users.first().id != msg.author.id && !msg.mentions.users.first().bot) {
        let target_user = msg.mentions.users.first()
        let author = msg.author
        let question = args.slice(1).join(' ')
        let number = -1

        var author_number, target_number

        try {
          msg.react('2️⃣')
            .then(() => msg.react('3️⃣'))
            .then(() => msg.react('4️⃣'))
            .then(() => msg.react('5️⃣'))
            .then(() => msg.react('6️⃣'))
            .then(() => msg.react('7️⃣'))
            .then(() => msg.react('8️⃣'))
            .then(() => msg.react('9️⃣'))
            .then(() => msg.react('🔟'))
            .then(() => msg.react('❌'))
        } catch (error) {}

        const filter = (reaction, user) => {
          return ['❌', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'].includes(reaction.emoji.name) && user.id === target_user.id && user.id != 706410612934049823;
        }

        msg.awaitReactions(filter, {
            max: 1,
            time: 120000,
            errors: ['time']
          })
          .then(collected => {
            const reaction = collected.first()

            switch (reaction.emoji.name) {
              case '❌':
                number = -1
                msg.reactions.removeAll()
                setTimeout(() => msg.delete(), 10000)
                break
              case '2️⃣':
                number = 2
                break
              case '3️⃣':
                number = 3
                break
              case '4️⃣':
                number = 4
                break
              case '5️⃣':
                number = 5
                break
              case '6️⃣':
                number = 6
                break
              case '7️⃣':
                number = 7
                break
              case '8️⃣':
                number = 8
                break
              case '9️⃣':
                number = 9
                break
              case '🔟':
                number = 10
                break
            }
            if (number != -1)
              (async function () {
                [author_number, target_number] = await Promise.allSettled([Hot(author, target_user, question, number), Hot(target_user, author, question, number)])

              })().then((resolve) => {
                //console.log(author_number.value + " " + target_number.value)
                msg.reactions.removeAll()

                if (author_number.value == -1 || target_number.value == -1)
                msg.channel.send("Au moins un des deux adversaires n'a pas donné de chiffre pour \"" + question + "\"\nVous aviez une minute pour donner un chiffre.")
                if (author_number.value == target_number.value) {
                  msg.channel.send("**Résultats** \n<@" + author.id + "> : " + author_number.value + "\n<@" + target_user.id + "> : " + target_number.value +
                    "\nLe gage \"**" + question + "**\"doit être respecté car <@" + author.id + "> et <@" + target_user.id + "> ont donné le même chiffre !")
                } else {
                  msg.channel.send("**Résultats** \n<@" + author.id + "> : " + author_number.value +
                    "\n<@" + target_user.id + "> : " + target_number.value + "\nLe gage \"**" + question + "**\" n'a pas lieu d'être... Reverse ?").then(m => {
                    try {
                      m.react('🔄')
                        .then(() => m.react('❌'))
                    } catch {}

                    const filter1 = (reaction, user) => {
                      return ['❌', '🔄'].includes(reaction.emoji.name) && user.id === target_user.id && user.id != 706410612934049823;
                    }

                    m.awaitReactions(filter1, {
                      max: 1,
                      time: 120000,
                      errors: ['time']
                    }).then(collected => {
                      const reaction1 = collected.first()

                      if (reaction1.emoji.name == '❌')
                        m.reactions.removeAll()
                      else if (reaction1.emoji.name == '🔄') {
                        number = (number > 3 ? Math.round(number / 2) : 2)

                        //console.log(number)

                        var author_number, target_number

                        (async function () {
                          [author_number, target_number] = await Promise.allSettled([Hot(author, target_user, question, number), Hot(target_user, author, question, number)])

                        })().then((resolve) => {
                          //console.log(author_number.value + " " + target_number.value)
                          m.reactions.removeAll()

                          if (author_number.value == -1 || target_number.value == -1)
                            m.channel.send("Au moins un des deux adversaires n'a pas donné de chiffre pour le reverse de \"" + question + "\"\nVous aviez une minute pour donner un chiffre.")
                          else if (author_number.value == target_number.value) {
                            m.channel.send("**Résultats (reverse)** \n<@" + author.id + "> : " + author_number.value + "\n<@" + target_user.id + "> : " + target_number.value +
                              "\nLe gage \"**" + question + "**\"doit être respecté car <@" + author.id + "> et <@" + target_user.id + "> ont donné le même chiffre !")
                          } else {
                            m.channel.send("**Résultats (reverse)** \n<@" + author.id + "> : " + author_number.value +
                              "\n<@" + target_user.id + "> : " + target_number.value + "\nLe gage \"**" + question + "**\" n'a pas lieu d'être")
                          }
                        })
                      }
                    }).catch(() => {
                      //m.reply('Pas de réaction après 2 minutes pour "' + question + '"\nDonc pas de reverse.')
                      m.reactions.removeAll()
                    })
                  })

                }

              })

          }).catch(() => {
            msg.reply('Pas de réaction après 2 minutes pour "' + question + '"')
            msg.delete()
          })
          .catch(console.error)
      }
    }

  }

}