const superagent = require('superagent');
const Discord = require('discord.js')

module.exports = {
    name: "hentai",
    category: "nsfw",
    aliases: ["hentai"],
    usage: "hentai",
    description: "Envia fotos +18 de hentai",

    run: async (client, message, args, user, text, prefix) => {
        if (!message.channel.nsfw) return message.channel.send('Você só pode usar esse comando em canal `NSFW`!')
        superagent.get('https://nekos.life/api/v2/img/hentai')
            .end((err, response) => {
          const lewdembed = new Discord.MessageEmbed()
          .setTitle("Hentai")
          .setImage(response.body.url)
          .setColor(`#000000`)
          .setFooter(`Tags: hentai`)
          .setURL(response.body.url);
      message.channel.send(lewdembed);
        })
    }
}