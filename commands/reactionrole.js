module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message",
    async execute(message, args, Discord, bot) {
        const rereg = (args[0] === "registerer");
        const channel = '962460081667072010';
        const anyRole =  '962693959459672104';
        const hundretRole = '962694014488944650';

        const anyEmoji = '☑️';
        const hundretEmoji = '💯';

        if(!rereg){
            let embed = new Discord.MessageEmbed()
            .setColor('#f653a6')
            .setTitle('Choose your completion role:')
            .setDescription(`${anyEmoji} for completing the game but not all levels. \n ${hundretEmoji} for completing 100% of levels in the game.`);
            console.log(embed);
            let messageEmbed = await message.channel.send({embeds: [embed]});
            messageEmbed.react(anyEmoji);
            messageEmbed.react(hundretEmoji);
        }

        bot.on('messageReactionAdd', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === anyEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(anyRole);
                }
                if(reaction.emoji.name === hundretEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(hundretRole);
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
                if(reaction.emoji.name === anyEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(anyRole);
                }
                if(reaction.emoji.name === hundretEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(hundretRole);
                }
            }else {
                return;
            }
        });
    }
}