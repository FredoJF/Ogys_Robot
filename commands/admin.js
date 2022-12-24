const { SlashCommandBuilder } = require("discord.js");

const MusicPlayerBuilder = require("../classes/MusicPlayerBuilder");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Administration commands")
    .addSubcommand((command) =>
      command.setName("clearchannel").setDescription("Clear this text channel")
    )
    .addSubcommand((command) =>
      command
        .setName("createmusicchannel")
        .setDescription("Creates the music player text channel")
    )
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    if (!interaction.channel.isDMBased()) {
      switch (interaction.options.getSubcommand()) {
        case "clearchannel":
          interaction.channel.clone();
          interaction.channel.delete();
          break;

        case "createmusicchannel":
          interaction.channel
            .clone({ name: "Music" })
            .then((result) => {
              var message = new MusicPlayerBuilder([
                "Musique 1",
                "Musique 2",
                "Musique 3",
              ]).message;

              //console.log(message);
              result.send(message);
            })
            .catch((err) => {});
          await interaction.reply({
            content: "Music channel created !",
            ephemeral: true,
          });
          break;

        default:
          break;
      }
    }
  },
};
