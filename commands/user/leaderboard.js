const Discord = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    //definition
    name: "leaderboard", //the name of the command 
    category: "user", //the category this will be listed at, for the help cmd
    aliases: ["leaderbord", "rank"], //every parameter can be an alias
    cooldown: 5, //this will set it to a 2 second cooldown
    usage: "leaderboard @user", //this is for the help command for EACH cmd
    description: "Ver o rank de XP do servidor.", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        const rawLeaderbord = await Levels.fetchLeaderboard(message.guild.id, 10);

        if (rawLeaderbord.length < 1) return message.reply('Ninguém está no rank ainda!');

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderbord, true);

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP:${e.xp.toLocaleString()}`);

        const embed = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setTitle("LEADERBOARD")
        .setDescription(lb.join("\n\n"))

        message.channel.send(embed);
    }
}