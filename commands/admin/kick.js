const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    category: "Admin",
    aliases: [""],
    cooldown: 10,
    usage: "kick @user",
    description: "Usado para kikar membros do servidor!",

    run: async (client, message, args, user, text, prefix) => {
        let usuario = message.mentions.users.first();
        if(!message.guild.member(message.author.id).hasPermission("KICK_MEMBERS")) return reply("Você não tem permissão para usar BAKA!");
        if(!usuario) return message.reply("Você não mencionou um usuário!");
        if(usuario === message.author) return message.reply("Você não pode se auto kikar! BAAAAKA!");

        var razao = args.slice(1).join(" ");
        if(!razao) razao = "Não foi especificado";

        message.guild.member(usuario).kick(razao);

        let embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle("Usuário kikado do servidor!")
        .setColor("#8A0808")
        .setTimestamp()
        .addField("Usuário kikado:", usuario.tag)
        .addField("Kikado por:", `<@${message.author.id}>`)
        .addField("Razão:", razao);
        return message.channel.send(embed);
    }
}