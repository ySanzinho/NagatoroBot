const Discord = require('discord.js');
const UserSchema = require('../../schemas/userSchemas');

module.exports = {
    name: "rep",
    category: "user",
    aliases: ["rep"],
    cooldown: 86400,
    usage: "rep @user",
    description: "Dar 1 ponto de reputação para um usuário.",

    run: async (client, message, args, text, prefix) => {
        let user = message.mentions.members.first();
        if(!user) return message.reply('Por favor mencione um usuário para qual deseja dar 1 ponto de reputação.');
        if(user === user.bot) return message.channel.send('Você não pode dar pontos para BOTs BAKAAAA!');
        let data;
        try {
            data = await UserSchema.findOne({
                _id: user.id,
            })
            if(!data) {
                let newData = await UserSchema.create({
                    _id: user.id,
                    xp: 0,
                    level: 1,
                    reputation: 0
                })
                await newData.save();
            } else {
                await UserSchema.findOneAndUpdate({
                    reputation: data.reputation + 1
                })
            }
        } catch(err) {
            console.log(err)
        }
        let repEmbed = new Discord.MessageEmbed()
        .setTitle('Pontos de Reputação')
        .setColor('RANDOM')
        .addField('Doador:', `<@${message.author.id}>`)
        .addField('User:', `<@${user.id}>`)
        .addField('Pontos Adicionado:', '1')
        .addField('Pontos Total:', data.reputation + 1)
        message.channel.send(repEmbed);
    }
}