module.exports = {
    name: "clean",
    category: "Admin",
    aliase: [""],
    cooldown: 10,
    usage: "clean [numero]",
    description: "Apaga uma quantidade de mensagens do chat",

    run: async (client, message, args, user, text, prefix) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não pode usar isso!");
        if(!args[0]) return message.channel.send("oof");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`Foi apagado ${args[0]} mensagens.`).then(msg => msg.delete(5000));
        });
    }
}