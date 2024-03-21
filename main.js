const fs = require ('node:fs');
const path = require('node:path')
const {Client, Collection, GatewayIntentBits, Events, } = require('discord.js');
const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,       
    ]
})
const prefix = '!';

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('bruh bot is online!');
});

client.on('messageCreate', async message => {
    if (message.content == 'hi') {
        await message.reply({
            content:'hello!',
            ephemeral: false
        })
    }
})

client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'priv'){
        client.commands.get('priv').execute(message, args);
    } else if (command == 'dark'){
        client.commands.get('dark').execute(message, args);
    } else if (command == 'gate'){
            client.commands.get('gate').execute(message, args);
    }
});

client.login('ODQyMTgwNzY3NTQzMTk3Njk2.GS-RaT.Yv9aZAjP4NkdiElJMGsyhCdW-RryQEU5LmaYvk');
