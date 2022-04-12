const { Presence } = require("discord.js");
const logChannel = '959364753829019648';
const goingLiveChannel = '958739423053377596';
//const role = '959370118754893824';
//const streamerRole = '959376509288710146';


module.exports = (bot) => {
    bot.on("presenceUpdate", (oldPresence, newPresence) => {
        guild = bot.guilds.cache.find((g) => g.name === "Patrick's Parabox Community Server")
        if(newPresence.guild != guild) return false;
        if(!newPresence.activities) return false;
        //if(!newPresence.member.clientStatus === "desktop") return false;        
        role = guild.roles.cache.find((r) => r.name === 'Live');
        if(!role) return;
        let lengthvar = newPresence.activities.length;
        newPresence.activities.forEach((activity) => {
            if(activity.name === "Twitch" && activity.state === "Patrick's Parabox"){       
                newPresence.member.roles.add(role).catch(console.error);
                bot.channels.cache.get(logChannel).send(newPresence.member.user.tag + " assigned Live Role.")
                bot.channels.cache.get(goingLiveChannel).send(`${newPresence.member.displayName} is now Live join them here: ${activity.url}`)
            }else {
                newPresence.member.roles.remove(role).catch(console.error);
            }
        });
        if (newPresence.activities.length == 0){
            newPresence.member.roles.remove(role).catch(console.error);
        }
    })
}
