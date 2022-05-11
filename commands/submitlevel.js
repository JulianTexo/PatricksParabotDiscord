module.exports = {
    name: 'submitlevel',
    description: 'Provides command to submit a level to the daily Level Challange',
    async execute(message, args, Discord, bot){
        if (message.channel.type != 'DM') {
            message.reply('Please only submit levels in direct messages to me. Your message and this message will be deleted in 10 seconds.')
            .then(msg =>
                setTimeout(() => {
                    msg.delete();
                    message.delete();
                }, 10*1000)
            );
            return;
        }
        
        const rereg = (args[0] === "registerer");
        const verificationChannel = '962804055170773073';
        const archiveChannel = '962824195274833970';
        
        const verifyEmoji = '✅';
        const rejectEmoji = '❌';
        const reviveEmoji = '♻️';

        if(!rereg){
            if(message.attachments.size > 1){
                message.reply('Please only submit one Level at a time.')
            }else if(message.attachments.size == 0){
                message.reply('Please make sure to attach your level file to your message.')
            }else if(args == ''){
                message.reply('Please provide a level name. (!submitlevel levelname)')
            }
            else{
                const levelFile = message.attachments.first();
                console.log(levelFile.url)
                let response = await bot.channels.cache.get(verificationChannel).send({ 
                    content: `${message.author.id} (${message.author.username}) submitted a new Level called ${args}.`, 
                    files: [{
                        attachment: levelFile.url,
                        name: `${args}.txt`
                    }]
                });
                response.react(verifyEmoji);
                response.react(rejectEmoji);
                message.reply('Your level has been added to the verification queue and is awaiting verification by a member of the moderation team. This can take a while. Thank you for your patience!')
        }

        bot.on('messageReactionAdd', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id == verificationChannel){
                if(reaction.emoji.name === verifyEmoji){
                    //TODO implement github upload
                    var messageArray = reaction.message.content.split(' ')
                    if(messageArray[0] != 'Revived'){
                        bot.users.cache.get(messageArray[0]).send(`Your level ${messageArray[8]} has been verified and is now part of the daily Level rotation.`)
                    }
                    let archiveMessage = await bot.channels.cache.get(archiveChannel).send({
                        content: `${user.username} verified a level. \`\`\`${reaction.message.content}\`\`\` `,
                        files: [{
                            attachment: reaction.message.attachments.first().url,
                            name: reaction.message.attachments.first().name
                        }]
                    });
                    await reaction.message.delete();
                    archiveMessage.react(reviveEmoji);
                }
                if(reaction.emoji.name === rejectEmoji){
                    var messageArray = reaction.message.content.split(' ')
                    if(messageArray[0] != 'Revived'){
                        bot.users.cache.get(messageArray[0]).send(`Your level ${messageArray[8]} has been rejected if you have questions as to why you can use !modmessage to contact the moderation team.`)
                    }
                    let archiveMessageReject = await bot.channels.cache.get(archiveChannel).send({
                        content: `${user.username} rejected a level. \`\`\`${reaction.message.content}\`\`\` `,
                        files: [{
                            attachment: reaction.message.attachments.first().url,
                            name: reaction.message.attachments.first().name
                        }]
                    });
                    await reaction.message.delete();
                }
            }
            if(reaction.message.channel.id == archiveChannel){
                if(reaction.emoji.name === reviveEmoji){
                    let reviveMessage = await bot.channels.cache.get(verificationChannel).send({
                        content: `Revived this level.`,
                        files: [{
                            attachment: reaction.message.attachments.first().url,
                            name: reaction.message.attachments.first().name
                        }]
                    });
                    await reviveMessage.react(verifyEmoji);
                    await reviveMessage.react(rejectEmoji);
                }
            }
        })
        }
    }
}
