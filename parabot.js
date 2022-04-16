/* TODO implement !dm command (kinda done needs a few more tweaks possibly. Like testing out of own dms and stuff.)
* TODO implement !warn command (Idea was to !warn as a response to a message and have multiple options like !warn delete !warn timeout etc.; Should put I line in a text file (maybe?) to keep track of who was warned?)
* TODO implement !modmessage (which will allow anyone to send a message to a hidden modchannel so we can see requests to moderation team)
* TODO implement github access for bot to automatically upload Daily Levels into a git? (is this really the best way or should the bot store all files locally?)
* TODO implement pronoun roles (you probably know better which pronouns we need...possible to make it so that reactions are like mixeable to produce the role? (like He/Them by reaction with he and them emoji but also He/him by reacting with he and him emoji?))
* TODO implement Level preview rendering
*/

const discord = require('discord.js');
const schedule = require('node-schedule');
const checkstreaming = require('./checkstreaming');
const fs = require('fs');
require('dotenv').config()
console.log(process.env)


const bot = new discord.Client({partials: ['MESSAGE', 'REACTION', 'CHANNEL'],intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_PRESENCES, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, discord.Intents.FLAGS.DIRECT_MESSAGES, discord.Intents.FLAGS.GUILD_MEMBERS]});

const ppbGuild = '958400479258366002';
const logChannel = '959364753829019648';
const logChannelOnServer = '962729280469614652';
const customLevelChannel = '959123181774462987';

const prefix = '!'

bot.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command)
}


bot.on('ready', function () {
    bot.channels.cache.get(logChannel).send('Bot is online.');    
    bot.channels.cache.get(logChannelOnServer).send("Registering Reaction Listener for completion roles.").then(sent => {
        bot.commands.get('reactionrole').execute(sent, ["registerer"], discord, bot);
        bot.commands.get('colorroles').execute(sent, ["registerer"], discord, bot);
        bot.commands.get('submitLevel').execute(sent, ["registerer"], discord, bot);
        bot.commands.get('pronounRoles').execute(sent, ["registerer"], discord, bot);
    });    
    checkstreaming(bot);
})

bot.on('guildMemberAdd', function(){
    memberCount += 1
})

function getMemberCount(){
    return bot.guilds.cache.get(ppbGuild).memberCount
}

bot.on('messageCreate', async function(message){    
    if(message.channel.type == 'DM' && !message.content.startsWith(prefix) && !message.author.bot){
        message.reply('I\'m sorry I do not know what you want me to do. Please enter a valid command or type !help to get a list of commands.');
    }
    if(message.channel == customLevelChannel && message.attachments.size > 0){
        fileName = [...message.attachments][0][1].attachment.split('/').pop().split('.')[0]
        console.log(fileName)
        await message.startThread({
            name: `${message.author.username}'s ${fileName}`,
            autoArchiveDuration: 60,
            type: 'GUILD_PUBLIC_THREAD',
        })
        .then(threadChannel => console.log(threadChannel))
        .catch(console.error);
    }else{
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
    if(!message.content.startsWith('!') || message.author.bot){
        return;
    }else{
        if(command == 'reactionrole'){
            bot.commands.get('reactionrole').execute(message, args, discord, bot);
        }
        if(command == 'colorroles'){
            bot.commands.get('colorroles').execute(message, args, discord, bot);
        }
        if(command == 'pronounroles'){
            bot.commands.get('pronounRoles').execute(message, args, discord, bot);
        }
        if(command == 'addcolor'){
            bot.commands.get('addColor').execute(message, args, discord, bot);  
        }
        if(command == 'submitlevel' ){
            if(message.channel.type == 'DM'){
                bot.commands.get('submitLevel').execute(message, args, discord, bot);
            }else{
                message.reply('Please only submit levels in direct messages to me. Your message and this message will be deleted in 10 seconds.').then(msg =>
                setTimeout(() => {
                    msg.delete();
                    message.delete();
                }, 10*1000)
                )
            }
        }
        if(command == 'help'){
            message.reply('Possible commands are:\n !submitLevel <levelname>\n !modmessage <message>')
        }
        if(command == 'dm'){
            bot.commands.get('dm').execute(message, args, discord, bot);
        }
        if(command == 'modmessage'){
            bot.commands.get('modmessage').execute(message, args, discord, bot);
        }
        if(command == 'answer'){
            bot.commands.get('answer').execute(message, args, discord, bot);

        }
    }
    }
})

bot.login(process.env.BOT_TOKEN);

bot.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
    bot.channels.cache.get(logChannel).send(error);
})
