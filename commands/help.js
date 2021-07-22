const Discord = require('discord.js')
const Singleton = require('../classes/singleton')

module.exports = {

  /*
  match(msg){
    return msg.content.startsWith(Singleton.prefix + 'help') || msg.content.startsWith(Singleton.prefix + 'h')
  },*/

  name: 'help',
  aliases: ['h'],

  action(msg){
    if (!(msg.channel instanceof Discord.DMChannel))
        msg.reply('Je t\'ai envoyé la liste des commandes en privé').then((m) => {
          setTimeout(() => m.delete(), 10000)
        })

    msg.author.send('WOOOAH twee-vwoop VRrrUHD DEda dah\n\n'
    + 'Voici la liste des commandes disponibles\n\n'
    + '`' + Singleton.prefix + 'help`: Permet d\'afficher ce message\nAlias: `'+ Singleton.prefix + 'h`\n\n'
    + '`' + Singleton.prefix + 'vote durée intitulé`: Permet de créer un sondage pour lequel les utilisateurs peuvent répondre par oui ou non\nExemples: `' + Singleton.prefix +
    'vote 30 Aimez-vous la couleur rouge ?`\n`' + Singleton.prefix + 'vote 6m30 Aimez-vous la couleur bleue ?`\nAlias: `'+ Singleton.prefix + 'v durée intitulé`\n\n'
    + '`' + Singleton.prefix + 'scream`: Je crie\n\n'
    + '`' + Singleton.prefix + 'tg`: Si vous faites cette commande je vous insulte\n\n'
    + '`' + Singleton.prefix + 'ping`: Vous permet de connaître la latence que vous avez avec moi en millisecondes\n\n'
    + '`' + Singleton.prefix + 'coinflip`: Je fais un Pile ou Face pour vous\nAlias: `'+ Singleton.prefix + 'cf`\n\n'
    + '`' + Singleton.prefix + 'hot @utilisateur#0000 intitulé`: Permet de proposer un défi à un utilisateur cible basé sur le jeu "Pour Combien ?" ou "Hot Combien ?"\nExemples: `' + Singleton.prefix +
    'hot @Fredo#8489 Pour combien tu supprimes ton serveur Discord` ?\nAlias: `'+ Singleton.prefix + 'cote @utilisateur#0000 intitulé`\n\n'
    + 'Informations supplémentaires: Je suis encore en phase de développement, soyez donc indulgents svp\nSi vous avez une suggestion ou que vous trouvez un bug, contacter Fredo#8489')

  }

}
