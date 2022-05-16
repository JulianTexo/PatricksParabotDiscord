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


const bot = new discord.Client({ partials: ['MESSAGE', 'REACTION', 'CHANNEL'], intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_PRESENCES, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, discord.Intents.FLAGS.DIRECT_MESSAGES, discord.Intents.FLAGS.GUILD_MEMBERS] });

const ppbGuild = '958400479258366002';
const logChannel = '959364753829019648';
const logChannelOnServer = '962729280469614652';
const customLevelChannel = '959123181774462987';
const customWorldChannel = '962469093850628106';
const faqChannel = '966285081108938802';

const prefix = '!'

bot.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}


actions = new discord.Collection();

const actionFiles = fs.readdirSync('./actions/').filter(file => file.endsWith('.js'));
for (const file of actionFiles) {
    const action = require(`./actions/${file}`);

    actions.set(action.name, action);
}


bot.on('ready', function () {
    bot.channels.cache.get(logChannel).send('Bot is online.');
    bot.channels.cache.get(logChannelOnServer).send("Registering Reaction Listener for reactionroles.").then(sent => {
        bot.commands.get('reactionrole').execute(sent, ["registerer"], discord, bot);
        bot.commands.get('colorroles').execute(sent, ["registerer"], discord, bot);
        bot.commands.get('submitlevel').execute(sent, ["registerer"], discord, bot);
        bot.commands.get('pronounroles').execute(sent, ["registerer"], discord, bot);
    });
    checkstreaming(bot);
    bot.channels.cache.get(logChannel).send('Setup complete.');
})

async function getNameFromCustomChannel(message, targetFiletype) {
    for (let attachment of message.attachments.values()) {
        const lastIndex = attachment.name.lastIndexOf('.');
        const filename = attachment.name.slice(0, lastIndex);
        const filetype = attachment.name.slice(lastIndex+1);

        if (filetype == targetFiletype) {
            await message.startThread({
                name: `${message.author.username}'s ${filename}`,
                autoArchiveDuration: 60,
                type: 'GUILD_PUBLIC_THREAD',
            })
            .then(threadChannel => console.log(threadChannel))
            .catch(console.error);
            return;
        }
    }
}

bot.on('messageCreate', async function(message){
    if(message.channel.type == 'DM' && !message.content.startsWith(prefix) && !message.author.bot){
        message.reply('I\'m sorry I do not know what you want me to do. Please enter a valid command or type !help to get a list of commands.');
    }

    else if(message.channel == customLevelChannel && message.attachments.size > 0){
        await getNameFromCustomChannel(message, "txt");
    }

    else if(message.channel == customWorldChannel && message.attachments.size > 0){
        await getNameFromCustomChannel(message, "zip");
    }

    else if(!message.content.startsWith('!') || message.author.bot){
        return;
    }

    else {
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (bot.commands.has(command)) {
            bot.commands.get(command).execute(message, args, discord, bot);
        }
    }
})

bot.login(process.env.BOT_TOKEN);
