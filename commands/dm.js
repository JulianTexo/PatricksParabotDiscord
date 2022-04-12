module.exports = {
    name: 'dm',
    description: 'dms the person provided',
    async execute(message, args, discord, bot){
        const guild = '958400479258366002';
        //let dUser = await bot.guilds.cache.get(guild).members.fetch(message.mentions.users.first());
        let dUser = message.mentions.users.first();
        if(!dUser) return message.channel.send("Can't find user!");
        let messageAuthor = bot.guilds.cache.get(guild).members.cache.get(message.author.id);
        console.log(dUser)
        if(!messageAuthor.permissions.has('ADMINISTRATOR'))
            return message.reply("You don't have the persmission to use this command!");
        let dMessage = args.join(' ').slice(22);
        if (dMessage.length < 1) return message.reply('You must supply a message!');

        dUser.send(`${dUser} A Moderator from the Patrick's Parabox Community Server sent you: ${dMessage}`);

        message.author.send(`${message.author} You have sent your message to ${dUser}`);
    }
}