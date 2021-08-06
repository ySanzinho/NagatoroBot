const { Mongoose } = require("mongoose");
const levels = require("../levels");
const mongo = require("../mongo");

//here the event starts
module.exports = async client => {
    console.log(`Discord Bot ${client.user.tag} está online!`); //log when ready aka the bot usable
    client.user.setActivity(`${client.user.username}`, { type: "PLAYING"}) //first parameter, is the status, second is an object with type which can be: "PLAYING", "WATCHING", "LISTENING", "STREAMING" (where you need to add a , and then url: "https://twitch.tv/#")

    //Database Mongoose
    await mongo().then(Mongoose => {
        try {
            console.log('Conectado a Database"!')
        } finally {
            Mongoose.connection.close()
        }
    })

    levels(client)
    //
}