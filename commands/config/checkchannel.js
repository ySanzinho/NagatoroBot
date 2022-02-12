
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'checkChannel',
    category: 'config',
    aliases: ['checkChannel'],
    cooldown: 2,
    usage: 'checkChannel',
    description: 'Usado para checar qual o canal de entrada para o envio da mensagem de bem vindo do servidor.',

    run: async (client, message, args, user, text, prefix) => {
        if(!message.member.permission.has('ADMINISTRATOR')) return

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.reply('Esse server não tem dados guardado.');

            const channel = client.channel.cache.get(data.Channel);
            message.reply(`Canal de entrada => ${channel}`)
        })
    }

}