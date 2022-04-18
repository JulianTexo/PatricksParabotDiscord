module.exports = {
    name: 'help',
    description: 'prints out all possible commands',

    async execute(message, args, Discord, bot){
        message.reply('Possible commands are:\n !submitLevel <levelname>\n !modmessage <message>')
    }
}