module.exports = {
    name: 'faqQuestionAdded',
    description: 'Adds voting emojis to questions added to the FAQ channel.',

    async execute(message, discord, bot){

        const jt = '260497864277491712';
        const geer = '133784164011999232';

        const upVoteEmote = '👍'
        const downVoteEmote = '👎'
        const messageArray = message.content.split(/ +/)
        if(messageArray[0].toLowerCase() == 'question' || messageArray[0].toLowerCase() == 'question:'){
            await message.react(upVoteEmote);
            await message.react(downVoteEmote);
        }else{
            if(!(message.author == jt || message.author == geer)){
                await message.author.send('Please only ask questions to the developer in the faq-question-collect channel. Start your message with "question" to do so.')
                message.delete();
            }
        }
    }
}