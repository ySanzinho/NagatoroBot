const mongoose = require('mongoose')
//const { mongoPath } = require('./config.json')

const mongoPath = 'mongodb+srv://Fujimoto:S1EMCo1IfhRSfdZH@nagatorobot.c7y4d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}