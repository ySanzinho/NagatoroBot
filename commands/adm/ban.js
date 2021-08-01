const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    category: "Admin",
    aliase: [""],
    cooldown: 10,
    usage: "ban @user",
    description: "Para banir alguem do server",

    run: async (client, message, args, user, text, prefix) => {
        var usuario = message.mentions.users.firts();
        if(!message.guild.member(message.author.id).hasPermission("BAN_MEMBERS")) return message.reply("Você não pode usar isso!");
        if(!usuario) return message.reply("Você não mencionou ninguém");
        if(!message.guild.member(usuario).banneble) return message.reply("Eu não posso banir essa pessoa");

        var razao = args.slice(1).join(" ")
        if(!razao) razao = "Não foi Especificada";

        message.guild.member(usuario).ban(razao)

        const embedBan = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle("Usuário banido do servidor")
        .setColor("m8A0808")
        .setTimestamp()
        .addField("Usuário Banido:", usuario.tag)
        .addField("Banido por:", `<@${message.author.id}>`)
        .addField("Razão:", razao);
        return message.channel.send(embedBan);
    }
}