const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`B1ot logged in as ${client.user.tag}!`);
    
    // سطر ربط ملف الأوامر
    require('./commands.js')(client);
});

client.login(process.env.DISCORD_TOKEN);
