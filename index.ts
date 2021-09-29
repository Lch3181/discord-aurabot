import { ApplicationCommandPermissionType } from 'discord-api-types'
import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', async () => {
    console.log('The bot is ready')

    //test guild
    const guildId = '627324186855079956'
    const guild = client.guilds.cache.get(guildId)
    let commands

    //global if test guild is empty
    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    //create slashcommand
    commands?.create({
        name: 'cmd',
        description: 'using Command Prompt',
        defaultPermission: false,
        options: [{
            name: 'input',
            description: 'syntax for command',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        }]
    })

    //permission
    guild?.commands.permissions.add({
        command: '892538415038476390', //cmd command id
        permissions: [{
            id: '227956824521834500', //bot owner id
            type: 'USER',
            permission: true,
        }]
    })
})

//slashcommand responds
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return

    const { commandName, options } = interaction

    if (commandName === 'cmd') {
        await interaction.deferReply({
            ephemeral: true,
        })

        const result = await execShellCommand(options.getString('input')!) as string

        await interaction.editReply({
            content: result,
        })
    }
})

client.login(process.env.TOKEN)

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd: any) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error: any, stdout: unknown, stderr: unknown) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}