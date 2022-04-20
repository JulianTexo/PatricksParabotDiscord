module.exports = {
    name: 'faqQuestionAdded',
    description: 'Adds voting emojis to questions added to the FAQ channel.',

    async execute(message, args, discord, bot){

        const upVoteEmote = '👍'
        const downVoteEmote = '👎'
        if(args[0].toLowerCase() == 'question'){
            await message.react(upVoteEmote);
            await message.react(downVoteEmote);
        }
    }
}