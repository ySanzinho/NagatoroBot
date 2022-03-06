const welcomeSchema = require('../../database/schemas/welcomeSchemas');
const Discord = require('discord.js');

module.exports = {
    name: "setwelcome",
    category: "config",
    aliases: ['setwelcome'],
    cooldown: 2,
    usage: 'setWelcome <channel-id>',
    description: 'Usado para setar o canal de mensagem de boas vindas.',

    run: async (client, message, args, text, prefix) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Você não pode usar esse comando!');

        const channelW = message.mentions.channels.first();

        if(!channelW) return message.reply('Por favor especifique o canal que você deseja.');

        welcomeSchema.findOne({ guildID: message.guild.id}, async (err, data) => {
            if(data) {
                data.channelID = channelW.id;
                data.save();
            } else {
                new welcomeSchema({
                    guildID: message.guild.id,
                    channelID: channelW.id,
                }).save();
            }
            message.reply(`O novo canal de entrada é ${channelW}.`)
        })
    }
}