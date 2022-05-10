module.exports = {
    name: 'help',
    description: 'prints out all possible commands',

    async execute(message, args, Discord, bot){
        message.reply([
            'Possible commands are:',
            '!modmessage <message>',
            '!remind <world name> [level number]',
            '!solution <world name> <level number>'
        ].join('\n\t'));
    }
}
