const Command = require('./command.js')

module.exports = class Ping extends Command {

  static match(msg){
    return msg.content.startsWith(Command.prefix + 'ping')
  }

  static action(msg){
    let createdAt = msg.createdAt.valueOf()
    let now = Date.now()
    msg.reply('Pong! (' + (now - createdAt) + ' ms)')
  }


}
