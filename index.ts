import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
})

client.on('ready', async () => {
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        botOwners: process.env.BOTOWNER,
        testServers: [process.env.TESTSERVER as string],
        mongoUri: process.env.MONGO_URI,
        disabledDefaultCommands: [
            'help',
            'command',
            'language',
            'prefix',
            'requiredrole',
            'channelonly',
            'slash'
        ],
    })
})

if(process.env.NODE_ENV == "development") {
    client.login(process.env.TOKEN_DEV)
} else {
    client.login(process.env.TOKEN)
}