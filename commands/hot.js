const Command = require('../classes/command.js')

module.exports = class Hot extends Command {
  
  static hots = []
  
  static match(msg) {
    if (msg.content.startsWith(Command.prefix + 'hot')) {
      msg.react('😂');
      return true
    }
  }
  
  static action(msg) {
    if (msg.author.id == "224117484049924097"){
      msg.author.send('Hot combien tu fais ça ?')
      .then(m => {
        var hotnum = 10
        
        m.react('1️⃣')
        m.react('2️⃣')
        
        if (hotnum >= 3) {
          m.react('3️⃣')
        }
        if (hotnum >= 4) {
          m.react('4️⃣')
        }
        if (hotnum >= 5) {
          m.react('5️⃣')
        }
        if (hotnum >= 6) {
          m.react('6️⃣')
        }
        if (hotnum >= 7) {
          m.react('7️⃣')
        }
        if (hotnum >= 8) {
          m.react('8️⃣')
        }
        if (hotnum >= 9) {
          m.react('9️⃣')
        }
        if (hotnum == 10) {
          m.react('🔟')
        }
      })
    }
  }
  
}
