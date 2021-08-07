const mongoose = require('mongoose')
require('dotenv/config');
const db_password = process.env.DB_PASSWORD; 

const mongoPath = `mongodb+srv://${db_password}/Nagatoro?retryWrites=true&w=majority`

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}