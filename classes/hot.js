module.exports = async (user, opponent, question, number) => {

    return new Promise((resolve, reject) => {

        let choosen_number = -1

        user.send(question + '\nAdversaire: @' + opponent.tag).then(m => {

            var accepted_emojis = ['1️⃣', '2️⃣']

            m.react('1️⃣')
            m.react('2️⃣')

            if (number >= 3) {
                m.react('3️⃣')
                accepted_emojis.push('3️⃣')
            }
            if (number >= 4) {
                m.react('4️⃣')
                accepted_emojis.push('4️⃣')
            }
            if (number >= 5) {
                m.react('5️⃣')
                accepted_emojis.push('5️⃣')
            }
            if (number >= 6) {
                m.react('6️⃣')
                accepted_emojis.push('6️⃣')
            }
            if (number >= 7) {
                m.react('7️⃣')
                accepted_emojis.push('7️⃣')
            }
            if (number >= 8) {
                m.react('8️⃣')
                accepted_emojis.push('8️⃣')
            }
            if (number >= 9) {
                m.react('9️⃣')
                accepted_emojis.push('9️⃣')
            }
            if (number == 10) {
                m.react('🔟')
                accepted_emojis.push('🔟')
            }

            const filter = (reaction, user) => {
                return accepted_emojis.includes(reaction.emoji.name) && user.id != 706410612934049823;
            }

            m.awaitReactions(filter, {
                    max: 1,
                    time: 120000,
                    errors: ['time']
                })
                .then(collected => {
                    const reaction = collected.first()

                    switch (reaction.emoji.name) {
                        case '1️⃣':
                            choosen_number = 1
                            break
                        case '2️⃣':
                            choosen_number = 2
                            break
                        case '3️⃣':
                            choosen_number = 3
                            break
                        case '4️⃣':
                            choosen_number = 4
                            break
                        case '5️⃣':
                            choosen_number = 5
                            break
                        case '6️⃣':
                            choosen_number = 6
                            break
                        case '7️⃣':
                            choosen_number = 7
                            break
                        case '8️⃣':
                            choosen_number = 8
                            break
                        case '9️⃣':
                            choosen_number = 9
                            break
                        case '🔟':
                            choosen_number = 10
                            break
                    }

                    resolve(choosen_number)
                    m.delete()

                })
                .catch(console.error)

        })

    })
}