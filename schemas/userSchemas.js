const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: { type: String, require: true },
    xp: { type: Number },
    level: { type: String },
    reputation: { type: Number}
});

const User = mongoose.model("Users", userSchema);
module.exports = User;