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
client.login('MTUyMjgzNTM5NzE0MTU5NDE2Mg.GKWdbF.lDwNDEoccrXAGerv2ZN9EU85O4jxGrLqNbxbUU');
