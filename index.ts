import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
import keyFileStorage from 'key-file-storage'
import { uploadmap } from './global'
const kfs = keyFileStorage('./config')
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.MESSAGE_CONTENT
    ],
})

client.on('ready', async () => {
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        botOwners: JSON.parse(process.env.BOTOWNER as string),
        testServers: JSON.parse(process.env.TESTSERVER as string),
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

client.on('messageCreate', message => {
    if (!message.author.bot) return;
    if (message.channelId === kfs["auto_follow_map_update_channel_id"]) {
        if (message.attachments.size > 0) {
            message.attachments.forEach(async attachment => {
                let url = attachment.url
                let fileExtension = url.slice(-3)
                if (fileExtension == "w3x") {
                    let replyMessage = await message.reply("uploading new map")
                    let filename = url.split("/").pop()
                    let config = kfs["auto_follow_map_update_config_name"]
                    const filesize = await uploadmap(url, filename!, config)

                    var result = `Map: ${filename} with ${filesize} MB\n` +
                    `Download: ${url}\n` +
                    `You can now enter the game and dm the bot !map ${filename} to host ${filename} with !priv/pub 'gamename'`
        
                    if (config != null && config != "null") {
                        result = `Configuration: ${config}\n` +
                        `Map: ${filename} with ${filesize} MB\n` +
                        `Download: ${url}\n` +
                        `You can now enter the game and dm the bot !load ${config} to host ${filename} with !priv/pub 'gamename'`
                    }

                    await replyMessage.edit(result)
                }
            });
        }
    }
    
})

if(process.env.NODE_ENV == "development") {
    client.login(process.env.TOKEN_DEV)
} else {
    client.login(process.env.TOKEN)
}