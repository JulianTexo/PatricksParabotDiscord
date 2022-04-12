module.exports = {
    name: 'colorroles',
    description: "Sets up a reaction role message",
    async execute(message, args, Discord, bot) {
        const rereg = (args[0] === "registerer");
        const channel = '962460081667072010';

        const blueEmoji = '🔵';
        const greenEmoji = '🟢';
        const yellowEmoji = '🟡';
        const orangeEmoji = '🟠';
        const purpleEmoji = '🟣';

        const blueRole = '962686078001770546';
        const greenRole = '962686125779083284';
        const yellowRole = '962686220633264168';
        const orangeRole = '962686275939348521';
        const purpleRole = '962708664404312135';

        if(!rereg){
            let embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Choose Your Color:')
            .setDescription(`Choose the corresponding colored emoji to get your colored role.`);
            let messageEmbed = await message.channel.send({embeds: [embed]})
            messageEmbed.react(blueEmoji);
            messageEmbed.react(greenEmoji);
            messageEmbed.react(yellowEmoji);
            messageEmbed.react(orangeEmoji);
            messageEmbed.react(purpleEmoji);
        }

        bot.on('messageReactionAdd', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === blueEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blueRole);
                }
                if(reaction.emoji.name === greenEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(greenRole);
                }
                if(reaction.emoji.name === yellowEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(yellowRole);
                }
                if(reaction.emoji.name === orangeEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(orangeRole);
                }
                if(reaction.emoji.name === purpleEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(purpleRole);
                }
            } else {
                return;
            }
        });

        bot.on('messageReactionRemove', async (reaction, user) => {
            if(reaction.messagepartial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === blueEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blueRole);
                }
                if(reaction.emoji.name === greenEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(greenRole);
                }
                if(reaction.emoji.name === yellowEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowRole);
                }
                if(reaction.emoji.name === orangeEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(orangeRole);
                }
                if(reaction.emoji.name === purpleEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(purpleRole);
                }
            }
        });
    }
}