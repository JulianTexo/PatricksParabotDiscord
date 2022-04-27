const fs = require('fs');
const fileName = 'data/warnCounter.json'
const modRoleID = '958470006784532542'

async function addWarnCount(user, message) {
    let users = JSON.parse(fs.readFileSync(fileName));

    if (user in users) users[user] += 1;
    else users[user] = 1;

    var jsonString = JSON.stringify(users);

    fs.writeFileSync(fileName, jsonString, err => {
        if (err) console.error(err);
    });

    await message.reply(`${user} has ${users[user]} warning(s).`);
}

module.exports = {
    name: 'warn',
    description: 'Sends a warn to a user',

    async execute(message, args, Discord, bot){
        if (message.member.roles.cache.has(modRoleID)) { // Mod role ID
            for (const user of args) {
                await addWarnCount(user, message);
            }
        }
    }
}
