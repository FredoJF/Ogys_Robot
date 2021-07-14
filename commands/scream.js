module.exports = {

  name: 'scream',

  /*
  static match(msg){
    return msg.content.startsWith(Command.prefix + 'scream')
  }*/

  action(msg){
    msg.channel.send('https://www.youtube.com/watch?v=B6mh45mA_JY')
  }


}
