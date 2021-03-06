require('dotenv').config();
require('./strategies/discord');

const express = require( 'express' );
const passport = require( 'passport' );
const mongoose = require( 'mongoose' );
const session = require( 'express-session' );
const cors = require('cors');
const Store = require('connect-mongo');
const db_password = process.env.DB_PASSWORD;

const app = express();
const PORT = process.env.PORT || 3002
const routes = require( './routes' );

app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 60000 * 60 *24
  },
  resave: false,
  saveUninitialized: false,
  store: Store.create({ mongoUrl: `mongodb+srv://${db_password}/Nagatoro?retryWrites=true&w=majority`})
}));

app.use( cors( {
  origin: [ 'http://localhost:3000'],
  credentials: true,
}))

app.use(passport.initialize() );
app.use(passport.session() );

app.use( '/api', routes);

app.listen( PORT, () => console.log(`Rodando na Porta ${ PORT }` ) );

//Modules
const { Client, Collection } = require('discord.js');
//const { prefix } = require('./config.json'); // defining the prefix and token

//Schemas
const GuildSchemas = require('../database/schemas/guildSchemas');
const UserSchemas = require('../database/schemas/userSchemas');

//.ENV
const token = process.env.DISCORD_TOKEN;

//Level Discord XP config
const Levels = require('discord-xp');

const fs = require('fs'); // this package is for reading files and getting their inputs
const client = new Client();

client.commands = new Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Collection() //an collection for all your command-aliases
const cooldowns = new Collection(); //an collection for cooldown commands of each user

client.categories = fs.readdirSync("./commands/"); //categories

["command"].forEach(handler => {
	require(`../handlers/command`)(client);
}); //this is for command loading in the handler file, one fireing for each cmd
const eventhandler = require("../handlers/events");
const MongoStore = require('connect-mongo');
eventhandler(client); //this is for event handling 

//fires each time the bot receives a message
client.on('message', async message => {
      if (message.author.bot) return;// if the message  author is a bot, return aka ignore the inputs
      if (!message.guild) return; //if the message is not in a guild (aka in dms), return aka ignore the inputs

      // Configura????o do prefix do bot
      let prefix;
      let data = await GuildSchemas.findOne({
        _id: message.guild.id
      })
      if (data === null) {
        let newData = await GuildSchemas.create({
          _id: message.guild.id,
          prefix: 'n!',
          guildOwnerID: message.guild.owner.id
        })
        newData.save()
      } else {
        prefix = data.prefix
      }

      //Levels
      const randomXp = Math.floor(Math.random() * 23) + 1;
      const hasLevelUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
      if (hasLevelUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Voc?? upou para o n??vel ${user.level}!`);
      }

  
      if(!message.content.startsWith(prefix)&& message.content.startsWith(client.user.id)) return message.reply(`Meu Prefixo ??: **\`${prefix}\`**, digite \`${prefix}help\` para mais informa????o!`); //if the messages is not a command and someone tags the bot, then send an info msg
      if (!message.content.startsWith(prefix)) return; //if the message does not starts with the prefix, return, so only commands are fired!
      
      const args = message.content.slice(prefix.length).trim().split(/ +/g); //creating the argumest (each space == 1 arg)
      const cmd = args.shift().toLowerCase(); //creating the cmd argument by shifting the args by 1
      
      if (cmd.length === 0) return; //if no cmd, then return
      
      let command = client.commands.get(cmd); //get the command from the collection
      if (!command) command = client.commands.get(client.aliases.get(cmd)); //if the command does not exist, try to get it by his alias
  
     
      if (command) //if the command is now valid
      {
          if (!cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
              cooldowns.set(command.name, new Collection());
          }
          
          const now = Date.now(); //get the current time
          const timestamps = cooldowns.get(command.name); //get the timestamp of the last used commands
          const cooldownAmount = (command.cooldown || 1) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
        
          if (timestamps.has(message.author.id)) { //if the user is on cooldown
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
        
            if (now < expirationTime) { //if he is still on cooldonw
              const timeLeft = (expirationTime - now) / 1000; //get the lefttime
              return message.reply( 
                `Por favor espere ${timeLeft.toFixed(1)} mais segundo(s) antes de re-utilizar \`${command.name}\` comando.`
              ); //send an information message
            }
          }
        
          timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
          setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
        try{
          command.run(client, message, args, message.author, args.join(" "), prefix); //run the command with the parameters:  client, message, args, user, text, prefix, 
          /* /////////////////////////////////////////
          HERE AN EXAMPLE:
              User: Tomato#6966   types command:
                  !say Hello World, HEY!
                  what you can get from say cmd parameters: 
                      client is: the <DiscordClient>
                      message is: the <Message>
                      user is: the <DiscordUser>
                      text is: <everything fter the command:   Hello World, HEY!>
                      prefix is: <config.prefix:   !>
          */ ///////////////////////////////////////////////////////      
        }catch (error){
          console.log(error)
          return message.reply("Algo deu errado, executando: `" + command.name + "` comando")
        }
      } 
      else //if the command is not found send an info msg
      return message.reply(`Comando desconhecido, tente: **\`${prefix}help\`**`)
});

client.login(token)