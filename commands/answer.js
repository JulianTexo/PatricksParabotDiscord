module.exports = {
    name: 'answer',
    description: 'Gives mods the ability to answer to mod messages.',
    async execute(message, args, Discord, bot){
        const modMessageChannel = '964169733639389244';
        const guild = '958400479258366002';
        if(message.channel != modMessageChannel){
            message.delete()
        }else{
            const messageToAnswerTo = await message.channel.messages.fetch(message.reference.messageId);
            if(!messageToAnswerTo){
                message.reply(`There was an error sending the answer.`)
            }
            const userToAnswerTo = messageToAnswerTo.content.split(': ')[0];
            console.log(userToAnswerTo);
            const dMessage = args.join(' ');
            const memberToAnswerTo = await bot.guilds.cache.get(guild).members.fetch().then(members=>members.find(member=>member.user.tag === userToAnswerTo));
            console.log(memberToAnswerTo)
            memberToAnswerTo.send(`A mod replied to your message: ${dMessage}`)
        }
    }
}