const Discord = require('discord.js');
const PrefixSchema = require('../../database/schemas/guildSchemas');

module.exports =  {
    name: "prefix",
    category: "config",
    aliases: ["prefix"],
    cooldown: 2,
    usage: "prefix <text>",
    description: "Usado para setar novo prefix no servidor",

    run: async (client, message, args, text, prefix) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Você não tem permissão para usar esse comando!')

        const newprefix = args[0]
        if(!newprefix) return message.reply('Por favor escreva o novo prefixo!');
        if(newprefix.length > 4) return message.channel.send('Esse prefixo é muito grande, o máximo é 5 caracteres')

        let data;
        try{
            data = await PrefixSchema.findOne({
                _id: message.guild.id
            })
            if(!data) {
                let newData = await PrefixSchema.create({
                    _id: message.guild.id,
                    prefix: newprefix,
                    guildOwnerID: message.guild.owner.id
                })
                newData.save()
            } else {
                await PrefixSchema.findOneAndUpdate({
                    _id: message.guild.id,
                    prefix: newprefix,
                    guildOwnerID: message.guild.owner.id
                })
            }
            message.channel.send(`O prefixo foi alterado para ${newprefix}`)
        } catch(err) {
            console.log(err)
        }
    }
}