require("dotenv").config();
const moment = require("moment"),
  fs = require("fs"),
  path = require("path"),
  commands = [];

// SEND COMMANDS TO DISCORD
const { REST, Routes, Collection } = require("discord.js");

// const commands = [
//   {
//     name: "ping",
//     description: "Replies with Pong!",
//   },

//   {
//     name: "join",
//     description: "Joins the voice channel you are in.",
//   },

//   {
//     name: "leave",
//     description: "Leaves the voice channel.",
//   },

//   {
//     name: "setup",
//     description: "Creates a text channel for music management.",
//   },
// ];

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//DB CONNECTION
const { Client: PGClient } = require("pg");
const pg = new PGClient();
pg.connect();

// COMMANDS
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands"),
  commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file),
    command = require(filePath);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Une erreur est survenue!",
      ephemeral: true,
    });
  }
});

client.login(process.env.TOKEN);
