const Discord = require('discord.js');
const canvacord = require('canvacord');

module.exports = {
    name: 'triggered',
    category: 'fun',
    aliases: ["triggered"],
    cooldown: 2,
    usage: 'triggered',
    description: "Just a meme...",

    run: async (client, message, args, user, text, prefix) => {
        let userT = message.mentions.users.first() || message.author;
        let msg = await message.channel.send('Triggering...')
        let img = await canvacord.Canvas.trigger(user.displayAvatarURL({dynami: false, format: 'png', size: 1024}))
        let attachment = new Discord.MessageAttachment(img, 'triggered.gif')
        message.channel.send(attachment)
        .then(() => {
            msg.delete()
        })
    }
}