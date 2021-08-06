const Mongoose = require('mongoose')
const mongo = require('./mongo')
const profileSchemas = require('./schemas/profile-schemas')

Mongoose.set('useFindAndModify', false);

 module.exports = (client) => {
     client.on('message', message => {
         const { guild, member } = message

         addXP(guild.id, member.id, 23, message)
     })
 }

 const getNeededXp = level => level * level * 100

 const addXP = async (guildId, userId, xpToAdd, message) => {
     await mongo().then(async Mongoose => {
         try {
            const result = await profileSchemas.findOneAndUpdate({
                 guildId,
                 userId
             }, {
                 guildId,
                 userId,
                 $inc: {
                     xp: xpToAdd
                 }
             }, {
                 upsert: true,
                 new: true
             })

             const { xp, level } = result
             const needed = getNeededXp(level)

             if (xp >= needed) {
                 ++level
                 xp -= needed

                 message.reply(`Você agora é level ${level} com ${xp} experiencia!`)

                 await profileSchemas.updateOne({
                     guildId,
                     userId
                 }, {
                     level,
                     xp
                 })
             }
         } finally {
             Mongoose.connection.close()
         }
     })
 }

 module.exports.addXP = addXP