const fs = require('fs');
const levels = JSON.parse(fs.readFileSync('levels.json', 'utf8'));

module.exports = {
    name: 'remind',
    description: 'Sends a screenshot of a specific level',

    async execute(message, args, Discord, bot){
        let worldName = args.filter(arg => arg != '||').join('_').replaceAll('||', '').toLowerCase();

        if (worldName == 'hell' || worldName == 'cup')
            worldName = 'open_5';

        if (worldName in levels) {
            let levelLink = 'https://i.imgur.com/' + levels[worldName]["screenshotImgurID"] + '.png';

            if (message.channel.type == 'DM')
                message.reply(levelLink);
            else
                message.reply('||' + levelLink + '||');
        }
        else {
            message.reply('I\'m sorry I do not know this level.');
        }
    }
}
