const fs = require('fs');
const levels = JSON.parse(fs.readFileSync('levels.json', 'utf8'));

module.exports = {
    name: 'remind',
    description: 'Sends a screenshot of a specific level',

    async execute(message, args, Discord, bot){
        let worldName = args.join('_').toLowerCase();

        console.log("World Name: " + worldName);

        if (worldName in levels) {
            message.reply("||https://i.imgur.com/" + levels[worldName] + ".png||");
        }
        else {
            message.reply("I\'m sorry I do not know this level.");
        }
    }
}
