const Discord = require('discord.js')
const Command = require('./command.js')

module.exports = class Help extends Command {

  static match(msg){
    return msg.content.startsWith(Command.prefix + 'help') || msg.content.startsWith(Command.prefix + 'h')
  }

  static action(msg){
    if (!(msg.channel instanceof Discord.DMChannel))
        msg.reply('Je t\'ai envoyé la liste des commandes en privé')

    msg.author.send('Voici la liste des commandes disponibles\n\n'
    + '`' + Command.prefix + 'help`: Permet d\'afficher ce message\nAlias: `'+ Command.prefix + 'h`\n\n'
    + '`' + Command.prefix + 'vote durée intitulé`: Permet de créer un sondage pour lequel les utilisateurs peuvent répondre par oui ou non\nExemples: `' + Command.prefix +
    'vote 30 Aimez-vous la couleur rouge ?`\n`' + Command.prefix + 'vote 6m30 Aimez-vous la couleur bleue ?`\nAlias: `'+ Command.prefix + 'v durée intitulé`\n\n'
    + '`' + Command.prefix + 'tg`: Si vous faites cette commande je vous insulte\n\n'
    + 'Informations supplémentaires: Je suis encore en phase de développement, soyez donc indulgents svp\nSi vous avez une suggestion ou que vous trouvez un bug, contacter Fredo#8489')
  }

}
