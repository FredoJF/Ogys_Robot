const Command = require('./command.js')

module.exports = class Scream extends Command {

  static match(msg){
    return msg.content.startsWith(Command.prefix + 'scream')
  }

  static action(msg){
    msg.channel.send('https://www.youtube.com/watch?v=B6mh45mA_JY')
  }


}
