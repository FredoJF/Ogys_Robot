const fs = require("fs");
const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();
const Singleton = require("./classes/singleton");
const checkVideo = require("./classes/checkVideo");

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module

  client.commands.set(command.name, command);

  //console.log(command.name)

  if (command.hasOwnProperty("aliases"))
    command.aliases.forEach((element) => {
      //    console.log(element)
      client.commands.set(element, command);
    });
}

client.on("ready", () => {
  const readGuildsInfos = fs.readFileSync("guilds.json");
  Singleton.guildinfos = JSON.parse(readGuildsInfos);

  client.user.setPresence({
    activity: {
      name: Singleton.prefix + "help",
      type: 3,
    },
    status: "available",
  });
});

client.on("guildMemberAdd", (member) => {
  if (process.env.AUTO_ROLE == "true") {
    //console.log(guildinfos);

    Object.values(Singleton.guildinfos).forEach((guild) => {
      if (member.guild.id == guild.id) {
        if (member.user.bot)
          member.roles.add(
            member.guild.roles.cache.find((r) => r.id === guild.roles.bots)
          );
        else {
          member.roles.add(
            member.guild.roles.cache.find((r) => r.id === guild.roles.everyone)
          );
        }
      }
    });
  }
});

function checkCommand(msg) {
  if (msg.content.charAt(0) == Singleton.prefix) {
    const args = msg.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    //console.log(command)

    try {
      client.commands.get(command).action(msg);
    } catch (error) {
      //console.error(error)
      //msg.reply('there was an error trying to execute that command!')
    }
  }
}

client.on("message", function (msg) {
  if (msg.attachments.size > 0) {
    (async function () {
      await checkVideo(msg.attachments.array()[0].url);
    })()
      .then((resolve) => {
        //console.log("then safe")
        checkCommand(msg);
      })
      .catch((reject) => {
        //console.log("then reject")
        msg.reply(
          "Interdiction d'envoyer ce genre de contenu (crash vidéo/gif)"
        );
        msg.delete();
      });

    if (
      Singleton.validURL(msg.content) &&
      !msg.content.includes("youtube.com")
    ) {
      (async function () {
        await checkVideo(msg.content);
      })()
        .then((resolve) => {
          //console.log("then safe")
          checkCommand(msg);
        })
        .catch((reject) => {
          //console.log("then reject")
          msg.reply(
            "Interdiction d'envoyer ce genre de contenu (crash vidéo/gif)"
          );
          msg.delete();
        });
    }
  } else {
    checkCommand(msg);
  }
});

client.on("error", () => {
  client.login(process.env.BOT_LOGIN);
});

client.login(process.env.BOT_LOGIN);
