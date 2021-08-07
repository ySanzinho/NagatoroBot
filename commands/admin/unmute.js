const { MessageEmbed, Channel } = require("discord.js");

module.exports = {
    name: "unmute",
    category: "Admin",
    aliases: ["unmute", "umute", "ut"],
    cooldown: 10,
    usage: "unmute @user",
    description: "Usado para desmutar players",

    run: async (client, message, args, user, text, prefis) => {
        //Checa a permissão do usuário que esta usando o comando
        if(!message.member.hasPermission("MANEGE_MESSAGES") || !message.guild.owner) return message.reply('Você não tem permissão para usar isso BAAAAKA!');
        //Checa se o bot tem permissão
        if(!message.guild.me.hasPermission(["MANEGE_MESSAGES", "ADMINISTRATOR"])) return message.replay('Eu não tenho permissão!');
        //Puxa o usuário como mutee
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!mutee) return message.reply('Não foi mensionado usuário.')
        //Seleciona muterole como o cargo Muted
        let muterole = message.guild.roles.find(r=> r.name === "Muted");

        mutee.removeRole(muterole.id).then(() => {
            let embed = new MessageEmbed()
            .addField("Usuário desmutado:", `<@${mutee.id}>`)
            .setTimestamp()
            .setColor("#FE2E2E");
            message.delete()
            message.channel.send(embed);
        })
    }
}