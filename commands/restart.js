
module.exports = {
    name: 'restart',
    description: 'command for moderators to restart the bot',
    async execute(message, args, Discord, bot){

        var { exec } = require('child_process');

        const geer = '133784164011999232'
        const jt = '260497864277491712'

        const logChannel = '959364753829019648'

        if (!(message.author.id == geer || message.author.id == jt)){
            message.reply('You shouldn\'t know of this command!');
            bot.channels.cache.get(logChannel).send(message.author.tag + ' tried to use the restart command.')
            return
        }else{
            if(args.join(' ') == 'git pull'){
                bot.channels.cache.get(logChannel).send('Pulling git repository.')
                await execWaitForOutput('git pull');
            }else{
                message.reply('Restarting bot!');
                setTimeout(function () {                
                    process.exit();
                }, 5000);
            }
        }

        async function execWaitForOutput(command, execOptions = {}) {
            return new Promise((resolve, reject) => {
                const childProcess = exec('git pull', execOptions);
        
                // stream process output to console
                childProcess.stderr.on('data', data => bot.channels.cache.get(logChannel).send(data));
                childProcess.stdout.on('data', data => bot.channels.cache.get(logChannel).send(data));
                // handle exit
                childProcess.on('exit', () => resolve());
                childProcess.on('close', () => resolve());
                // handle errors
                childProcess.on('error', error => reject(error));
            })
        }
    }
}