module.exports = {
    name: 'pronounRoles',
    description: 'Sends a message for pronoun Roles',
    async execute(message, args, Discord, bot){
        const rereg = (args[0] === "registerer");

        const channel = '962460081667072010';

        const sheHerEmote = '🇸';
        const heHimEmote = '🇭';
        const theyThemEmote = '🇹';
        const otherEmote = '🇴';

        const sheHerRole = '964237921630711848';
        const heHimRole = '964238240594952192';
        const theyThemRole = '964238270642921523';
        const otherRole = '964238302695796866';

        if(!rereg){
            let embed = new Discord.MessageEmbed()
            .setColor('#f653a6')
            .setTitle('Choose your pronouns:')
            .setDescription(`Select your personal pronouns so other users know how to refer to you! For more clarity consider putting them in your username as well. \n\n${sheHerEmote} she/her\n ${heHimEmote} he/him\n ${theyThemEmote} they/them\n ${otherEmote} other`);
            let messageEmbed = await message.channel.send({embeds: [embed]});
            messageEmbed.react(sheHerEmote);
            messageEmbed.react(heHimEmote);
            messageEmbed.react(theyThemEmote);
            messageEmbed.react(otherEmote);
        }

        bot.on('messageReactionAdd', async (reaction, user) =>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === sheHerEmote){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(sheHerRole);
                }
                if(reaction.emoji.name === heHimEmote){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(heHimRole);
                }
                if(reaction.emoji.name === theyThemEmote){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(theyThemRole);
                }
                if(reaction.emoji.name === otherEmote){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(otherRole);
                }
            }else{
                return;
            }
        });

        bot.on('messageReactionRemove', async (reaction, user) => {
            if(reaction.messagepartial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === sheHerEmote){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(sheHerRole);
                }
                if(reaction.emoji.name === heHimEmote){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(heHimRole);
                }
                if(reaction.emoji.name === theyThemEmote){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(theyThemRole);
                }
                if(reaction.emoji.name === otherEmote){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(otherRole);
                }
            }else {
                return;
            }
        });
    }
}
