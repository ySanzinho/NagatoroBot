//Here the command starts
module.exports = {
    //definition
    name: "ping", //the name of the command 
    category: "fun", //the category this will be listed at, for the help cmd
    aliases: ["ping"], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "ping", //this is for the help command for EACH cmd
    description: "Send Pong in the channel", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        //EVERTHING in HERE CAN BE A PART OF THE COMMAND	
        message.channel.send("pong.") //you could also do:  message.channel.send(args.join(" "))
        //another example: message.channel.send(user + "send the message: " + text)
    }
}