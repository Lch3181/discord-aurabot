import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../global";
import * as fs from 'fs'

export default {
    name: 'uploadmap',
    category: 'Configuration',
    description: 'upload a map to bot',
    guildOnly: true,
    globalCooldown: '1m',
    options: [
        {
            name: 'url',
            description: 'direct download link',
            required: true,
            type: 3
        },
        {
            name: 'file_name',
            description: 'the name of the file',
            required: true,
            type: 3
        },
        {
            name: 'config_name',
            description: 'the name of the config file for !load',
            required: true,
            type: 3
        }
    ],

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            var result = ''
            const url = interaction.options.getString('url')
            const filename = interaction.options.getString('file_name')
            const config = interaction.options.getString('config_name')
            const syntax = `wget -O \"/home/lch/aura-bot/maps/${filename}\" \"${url}\"`

            //error handling
            if (!filename?.includes('w3x')) {
                await interaction.editReply({
                    content: 'Please only upload warcraft III maps.',
                })

                return
            }
            
            //write config file
            const data = `map_path = maps\\${filename}\nmap_type =\nmap_localpath = ${filename}\n`

            fs.writeFile(`/home/lch/aura-bot/mapcfgs/${config}.cfg`, data, 'utf8', error => {
                if (error) throw error
            })

            //download map
            await execShellCommand(syntax)

            //get filesize for user to double check if correct
            const filesize = (await fs.promises.stat(`/home/lch/aura-bot/maps/${filename}`)).size

            //output
            result += `${config}.cfg and ${filename} with ${filesize} Byte uploaded.`
            result += `\nYou can now enter the game and type !load ${config} to host ${filename}`

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand
