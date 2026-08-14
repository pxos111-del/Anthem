const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // تعيين الحالة الحمراء (Do Not Disturb)
    client.user.setStatus('dnd');
});

// الصق التوكن الخاص بك هنا بين علامتي التنصيص
client.login(process.env.DISCORD_TOKEN);
