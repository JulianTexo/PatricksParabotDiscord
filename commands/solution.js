const fs = require('fs');
const levels = JSON.parse(fs.readFileSync('levels.json', 'utf8'));

module.exports = {
    name: 'solution',
    description: 'Sends a solution of a specific level',

    async execute(message, args, Discord, bot){
        let worldName = args.filter(arg => arg != '||').join('_').replaceAll('||', '').toLowerCase();

        if (worldName in levels && "solution" in levels[worldName]) {
            let levelSolution = '`' + levels[worldName]["solution"] + '`';

            if (message.channel.type == 'DM')
                message.reply(levelSolution);
            else
                message.reply('||' + levelSolution + '||');
        }
        else {
            message.reply('I\'m sorry I do not know this level.');
        }
    }
}