const Levels = require('discord-xp')
const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = {
    //definition
    name: "level", //the name of the command 
    category: "user", //the category this will be listed at, for the help cmd
    aliases: ["level", "nivel"], //every parameter can be an alias 
    usage: "level @user", //this is for the help command for EACH cmd
    description: "Ver o nível do usuário", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        const target = message.mentions.users.first() || message.author; //grab the target

        const userTarget = await Levels.fetch(message.author.id, message.guild.id); // Selects the target from the database

        const neededXp = Levels.xpFor(parseInt(userTarget.level) + 1);

        if (!userTarget) return message.channel.send('Parece que esse usuário não ganhou XP o suficiente '); //

        const rank = new canvacord.Rank()
            .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setCurrentXP(userTarget.xp)
            .setRequiredXP(neededXp)
            .setStatus(message.author.presence.status)
            .setProgressBar('#FFA500', "COLOR")
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator)
        rank.build()
            .then(data => {
                const attatchment = new Discord.MessageAttachment(data, `${message.author.username}Rank.png`)
                message.channel.send(attatchment);
            })
    }
}