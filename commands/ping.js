const Singleton = require('../classes/singleton')

module.exports = {

  name: 'ping',

  /*
  match(msg){
    return msg.content.startsWith(Singleton.prefix + 'ping')
  },*/

  action(msg){
    let createdAt = msg.createdAt.valueOf()
    let now = Date.now()
    msg.reply(('Pong! (' + (now - createdAt) + ' ms)').replace('-',''))
  }


}
