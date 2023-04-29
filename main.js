const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require ('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('bruh bot is online!');
});

client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    if (command === 'checkpp'){
        client.commands.get('checkpp').execute(message, args);
    } else if (command == 'dark'){
        client.commands.get('dark').execute(message, args);
    } else if (command == 'gate'){
            client.commands.get('gate').execute(message, args);
    }
});

client.login('ODQyMTgwNzY3NTQzMTk3Njk2.YJxj9Q.PB-cuPcZzEBxay0xiHPUWCnkcf4');
