const canvacord = require('canvacord');
const { Mongoose } = require('mongoose');
const mongo = require('../database/mongo');
const Discord = require('discord.js');

module.exports = async member => {
    const welcomeCard = new canvacord.Welcomer()
    .setUsername(member.setUsername.username)
    .setDiscriminator(member.username.discriminator)
    .setAvatar(member.username.displayAvatarURl({format: 'png'}))
    .setColor('title', '#424ef5')
    .setColor('username-box', '#424ef5')
    .setColor('discriminator-box', '#424ef5')
    .setColor('message-box', '#424ef5')
    .setColor('border', '#34068a')
    .setColor('avatar', '#550dd1')
    .setBackground('https://i.pinimg.com/originals/4d/56/d3/4d56d3e020006db7e22a073d4dc6ece0.jpg')
    .setMemberCount(member.guild.memberCount)
    let attachment = new Discord.MessageAttachment(await welcomeCard.build(), 'welcome.png')
    member.guild.channels.cache.get('873658662231629926').send(member.user.toString(), attachment)
}