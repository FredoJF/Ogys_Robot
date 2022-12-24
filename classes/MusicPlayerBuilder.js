const { MessagePayload } = require("discord.js");

module.exports = class MusicPlayerBuilder {
  constructor(
    queue = "",
    imageURI = "https://www.stockvault.net/data/2020/06/30/277212/preview16.jpg"
  ) {
    //this.target = target;
    this.queue = queue;
    this.imageURI = imageURI;
  }

  queueListBuild() {
    var queue = "**__Queue List__**";

    if (this.queue.length == 0) queue += "\n- empty";
    else
      this.queue.forEach((element) => {
        queue += "\n- " + element;
      });

    return queue;
  }

  get message() {
    var message = new MessagePayload();

    message.body = {
      content: this.queueListBuild(),
      embeds: [
        {
          author: {
            name: "Fred2Rue Music Player",
          },
          image: {
            url: "https://www.stockvault.net/data/2020/06/30/277212/preview16.jpg",
          },
        },
      ],
    };
    message.files = [];

    return message;
  }
};
