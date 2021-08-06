const Mongoose = require("mongoose")

const reqString = {
    type: String,
    required: true,
}

const profileSchema = Mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
    },
})

module.exports = Mongoose.model('profiles', profileSchema)