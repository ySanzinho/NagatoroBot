const { Mongoose } = require('mongoose');
const mongo = require('../database/mongo');
const guildSchema = require('../schemas/guildSchemas');

module.exports = (client, guild) => {
    guildSchema.findOne({ _id: guild.id}, async (err, data) => {
        if(data) {
            return;
        } else {
            new guildSchema({
                _id: guild.id,
                prefix: 'n!',
            }).save();
        }
    })
}