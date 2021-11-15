const superagent = require('superagent');
const Discord = require('discord.js')

module.exports = {
    name: "lizard",
    category: "nsfw",
    aliases: ["lizard"],
    usage: "lizard",
    description: "Envia fotos +18 de hentai",

    run: async (client, message, args, user, text, prefix) => {
        superagent.get('https://nekos.life/api/v2/img/lizard')
            .end((err, response) => {
          const lewdembed = new Discord.MessageEmbed()
          .setTitle("Hentai")
          .setImage(response.body.url)
          .setColor(`#000000`)
          .setFooter(`Tags: lizard`)
          .setURL(response.body.url);
      message.channel.send(lewdembed);
        })
    }
}