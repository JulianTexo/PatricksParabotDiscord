module.exports = {
    name: 'modmessage',
    description: 'Sends a message to the mods.',
    async execute(message, args, Discord, bot){
        var modMessageChannel = '964169733639389244';
        let dMessage = args.join(' ');
        if(!message.channel.type == 'DM'){
            message.reply('Please only use this command in the DMs to the bot. (This message and your message will be deleted in 10 seconds.)').then(msg =>
                setTimeout(() => {
                    msg.delete();
                    message.delete();
                }, 10*1000))
        }else{
            if(message.attachments.size > 1){
                message.reply('Please only submit one screenshot to a singular message. If you NEED to send more screenshots please state that you have more screenshots to send in your message. The moderation team will contact you.');
                return;
            }
            if(message.attachments.size == 1){
                var fileToAttach = message.attachments.first();
                await bot.channels.cache.get(modMessageChannel).send( {
                    content: `${message.author.tag}: ${dMessage}`,
                    files:[{
                        attachment: fileToAttach.url,
                        name: fileToAttach.name  
                    }],
                });
            }else{
                await bot.channels.cache.get(modMessageChannel).send(`${message.author.tag}: ${dMessage}`);
            }
            
        }
    }
}