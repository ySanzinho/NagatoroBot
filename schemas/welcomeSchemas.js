const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    guildID: { type: String },
    channelID: { type: String }
})

module.exports = mongoose.model('welcomes', Schema);