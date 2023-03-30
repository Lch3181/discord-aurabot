import { ICommand } from "wokcommands";
import { execShellCommand } from "../global";
import * as fs from 'fs'

export default {
    name: 'upload_map',
    category: 'Configuration',
    description: 'upload a map to bot (root admin only)',
    ownerOnly: (process.env.USAGE == "public") ? true:false,
    guildOnly: true,
    globalCooldown: '1m',
    options: [
        {
            name: 'url',
            description: 'direct download link. Example: Discord attachment, right click copy link',
            required: true,
            type: 3
        },
        {
            name: 'file_name',
            description: 'the name of the map. Example for twrpg: twrpgv0.53a_eng',
            required: true,
            type: 3
        },
        {
            name: 'config_name',
            description: 'the name of the config file. Example for twrpg: twre',
            required: false,
            type: 3
        }
    ],

    slash: true,
    testOnly: (process.env.NODE_ENV == "development") ? true:false,

    callback: async ({ interaction }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            const url = interaction.options.getString('url')
            const filename = interaction.options.getString('file_name') + '.w3x'
            const config = interaction.options.getString('config_name')

            //get filesize for user to double check if correct
            const filesize = await uploadmap(url!, filename!, config!)

            //output
            var result = `Map: ${filename} with ${filesize} MB\n` +
            `Download: ${url}\n` +
            `You can now enter the game and dm the bot !map ${filename} to host ${filename} with !priv/pub 'gamename'`

            if (config) {
                result = `Configuration: ${config}\n` +
                `Map: ${filename} with ${filesize} MB\n` +
                `Download: ${url}\n` +
                `You can now enter the game and dm the bot !load ${config} to host ${filename} with !priv/pub 'gamename'`
            }

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand

export async function uploadmap(url: string, filename: string, config?: string) {
    const syntax = `wget -O \"${process.env.AURABOT_ADDRESS}/maps/${filename}\" \"${url}\"`

    //write config file
    if (config != null && config != "null") {
        const data = `map_path = maps\\${filename}\n` +
        `map_type =\n` +
        `map_localpath = ${filename}\n`
    
        fs.writeFile(`${process.env.AURABOT_ADDRESS}/mapcfgs/${config}.cfg`, data, 'utf8', error => {
            if (error) throw error
        })
    }
    
    //download map
    await execShellCommand(syntax)

    //get filesize for user to double check if correct
    const filesize = (await fs.promises.stat(`${process.env.AURABOT_ADDRESS}/maps/${filename}`)).size
    let output = (filesize/1024/1024).toPrecision(4)

    return new Promise<string>(resolve => {
        resolve(output)
    })
}