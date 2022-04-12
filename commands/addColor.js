module.exports = {
    name: 'addColor',
    description: 'ads a smiley for reaction',
    async execute(message, args, Discord, bot){
        const smiley = message.args;
        const messageToReactTo = await message.channel.messages.fetch(message.reference.Id);
        console.log(messageToReactTo.get(message.reference.Id));
        //await messageToReactTo[message.reference.Id].react(smiley);
    }
}