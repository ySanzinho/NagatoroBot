const { MessageEmbed, Message } = require("discord.js");

module.exports = {

    name: "anuncio",
    category: "Admin",
    aliases: [""],
    cooldown: 10,
    usage: "anuncio <Texto>",
    description: "Fazer anuncio no servidor",

    run: async (client, message, args, user, text, prefix) => {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            message.delete();
            const anuncioEmbed = new MessageEmbed()
            .setTitle("Anuncio Importe:")
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(args.join(" "))
            .setColor("#610B0B")
            .setTimestamp();
            
            message.channel.send("@everyone") + message.channel.send(anuncioEmbed)
        }
    }
}