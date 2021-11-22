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
  client.user.setPresence({
    activity: {
      name: "_help",
      type: 3,
    },
    status: "available",
  });
});

client.on("guildMemberAdd", (member) => {
  if (member.guild.id == "712460386120761446") {
    if (member.user.bot)
      member.roles.add(
        member.guild.roles.cache.find((r) => r.id === "846113352262484018")
      );
    else {
      member.roles.add(
        member.guild.roles.cache.find((r) => r.id === "735567713505902614")
      );
    }
  } else if (member.guild.id == "715683809596801055") {
    if (member.user.bot)
      member.roles.add(
        member.guild.roles.cache.find((r) => r.id === "907289169892618331")
      );
    else
      member.roles.add(
        member.guild.roles.cache.find((r) => r.id === "907289212708093993")
      );
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

    /*if (!(msg.channel instanceof Discord.DMChannel))
      var commandUsed = Ping.parse(msg) || Scream.parse(msg) || Tg.parse(msg) || Vote.parse(msg) || Help.parse(msg)
    else
      var commandUsed = Ping.parse(msg) || Scream.parse(msg) || Tg.parse(msg) || Help.parse(msg)*/
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
