module.exports = {
    name: 'faqQuestionAdded',
    description: 'Adds voting emojis to questions added to the FAQ channel.',

    async execute(message, discord, bot){

        const upVoteEmote = '👍'
        const downVoteEmote = '👎'
        const messageArray = message.content.split(/ +/)
        if(messageArray[0].toLowerCase() == 'question' || messageArray[0].toLowerCase() == 'question:'){
            await message.react(upVoteEmote);
            await message.react(downVoteEmote);
        }
    }
}