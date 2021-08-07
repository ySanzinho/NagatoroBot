const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "mute",
    category: "Admin",
    aliases: [""],
    cooldown: 10,
    usage: "mute @user [tempo] <razão>",
    description: "Usado para não permitir membro digitar ou falar em call no servidor.",
    
    run: async (client, message, args, user, text, prefix) => {
        //Pegar permissão de quem está usando o comando.
        if(!message.member.hasPermission("MANAGE_MESSAGES") || !message.guild.owner) return message.reply("Você não tem permissão para usar BAKA!");
        if(!message.guild.me.hasPermission(["MANEGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("Eu não tenho permissão!")

        //Pega o usuário marcado
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(mutee = message.author) return message.reply("Você não pode se mutar BAAAAAAKA!");
        if(!mutee) return message.reply(`Para ver mais informações do comando, digite: ${config.prefix}help [CMD NAME]`);
        if(mutee.hasPermission('ADMINISTRATOR')) return message.reply('Eu não posso mutar `Administrador`');

        //Ele vai por args(2) como a razão
        let razao = args.slice(2).join(" ");
        if(!razao) razao = "Não especificada"

        //Vai procurar o cargo
        let muterole = message.guild.roles.find(r => r.name === "Muted");
        //Se não tiver o cargo ele vai criar
        if(!muterole) {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#7D7D7D",
                permissions: []
            })
            //Ele vai configurar o cargo
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermission(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                })
            })
        }
        //Vai pegar o tempo de mute
        let mutetime = args[1];
        if(!mutetime) return message.reply("Você não especifiou um tempo!");

        //Vai procurar e adicionar o cargo de Muted no usuário
        if(mutee.roles.find(r=> r.name === "Muted")) return message.delete()
        await (mutee.addRole(muterole.id));
        message.delete();
        
        //Embed de mute para enviar no chat
        let embed = new MessageEmbed()
        .setTitle("MUTADO! (=｀ω´=)")
        .setColor("#FE2E2E")
        .setTimestamp()
        .addField("Moderador:", `<@${message.author.id}>`)
        .addField("Usuário Mutado:", `<@${mutee.id}>`)
        .addField("Tempo:", `${ms(ms(mutetime))}`)
        .addField("Razão:", razao);
        message.channel.send(embed)

        //Acabando o tempo ele vai remover o cargo
        setTimeout(function() {
            if(!mutee.roles.find(r=> r.name === "Muted")) return
            mutee.removeRole(muterole.id);
            message.channel.send(`<@${mutee.id}> desmutado :white_check_mark:`)
        }, ms(mutetime));
    }
}