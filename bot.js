const { Client, GatewayIntentBits, ActivityType,} = require('discord.js');
const axios = require('axios');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
});

const config = {
    DISCORD_BOT_TOKEN: '', //Token Bota Discord
    FIVEM_SERVER_IP: '', // Ip Serwera (Tylko Numeryczne)
    FIVEM_SERVER_PORT: '', // Port Serwera
}
client.once('ready', () => {
    console.log('Bot Online!');
    updateStatus();
    setInterval(updateStatus, 60000); 
});

async function updateStatus() {
    try {
        const response = await axios.get(`http://${config.FIVEM_SERVER_IP}:${config.FIVEM_SERVER_PORT}/players.json`);
        const players = response.data;
        const playerCount = players.length;

        client.user.setPresence({
            activities: [{ name: `${playerCount} Gracze Online`, type: ActivityType.Watching }],
            status: 'online',
        });

        console.log(`Updated status: ${playerCount} players online`);
    } catch (error) {
        console.error('⛔️[Błąd]: Error fetching player data:', error);
        client.user.setPresence({
            activities: [{ name: `⛔️[Błąd]: Error fetching data`, type: ActivityType.Watching }],
            status: 'dnd',
        });
    }
}
client.login(config.DISCORD_BOT_TOKEN);
