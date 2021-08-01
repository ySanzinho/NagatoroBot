const { MessageEmbed } = require("discord.js");

module.exports = {
    //Definition
    name: "serverinfo",
    category: "utility",
    aliases: [""],
    cooldown:  10,
    usage: "serverinfo",
    description: "Retorna informação do servidor onde a mensagem foi enviada",

    run: async (client, message, args, user, text, prefix) => {
        let servericon = message.guild.iconURL;
        const embed = new MessageEmbed()
        .setTitle("Informação do Server")
        .setColor("RANDOM")
        .setThumbnail(servericon)
        .addField("Nome do Server", message.guild.name)
        .addField("Criado em", message.guild.createdAt)
        .addField("Você entrou em", message.member.joinedAt)
        .addField("Membro Total", message.guild.memberCount)
        .addField("Dono do servidor", `<@${message.guild.ownerID}>`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL);
        return message.channel.send(embed)
    }
}