const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    let createdAt = interaction.createdAt.valueOf();
    let now = Date.now();
    await interaction.reply(
      ("Pong! (" + (now - createdAt) + " ms)").replace("-", "")
    );
  },
};
