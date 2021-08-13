const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let guildSchema = new Schema({
    _id: { type: String, required: true },
    prefix: { type: String, default: "n!" },
    guildOwnerID: {type: String, require: true}
});

let model = mongoose.model("Guilds", guildSchema)

module.exports = model;