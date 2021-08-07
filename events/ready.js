const { Mongoose } = require("mongoose");
const mongo = require("../database/mongo");
const Levels = require('discord-xp');
require('dotenv')
const db_password = process.env.DB_PASSWORD;

//here the event starts
module.exports = async client => {
    console.log(`Discord Bot ${client.user.tag} está online!`); //log when ready aka the bot usable
    client.user.setActivity(`${client.user.username}`, { type: "PLAYING"}) //first parameter, is the status, second is an object with type which can be: "PLAYING", "WATCHING", "LISTENING", "STREAMING" (where you need to add a , and then url: "https://twitch.tv/#")

    //Database Mongoose
    await mongo().then(Mongoose => {
        try {
            console.log("Conectada a Database!")
        } finally {
            Mongoose.connection.close()
            Levels.setURL(`mongodb+srv://${db_password}/Nagatoro?retryWrites=true&w=majority`)
        }
    })
}