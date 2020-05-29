const Command = require('./command.js')

module.exports = class Tg extends Command {

  static match(msg){
    return msg.content.startsWith(Command.prefix + 'tg')
  }

  static action(msg){
    msg.reply('Fermes ta gueule')
  }


}
