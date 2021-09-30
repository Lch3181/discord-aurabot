import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../global";
import * as fs from 'fs'

export default {
    name: 'uploadmap',
    category: 'Configuration',
    description: 'upload a map to bot',
    ownerOnly: true,
    guildOnly: true,
    globalCooldown: '1m',
    options: [
        {
            name: 'url',
            description: 'download link',
            required: true,
            type: 3
        },
        {
            name: 'filename',
            description: 'enter filename manually if URL does not have file name at the end',
            required: true,
            type: 3
        },
        {
            name: 'config',
            description: 'enter the name of the config file for !load',
            type: 3
        }
    ],

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            const url = interaction.options.getString('url')
            const filename = interaction.options.getString('filename')
            const config = interaction.options.getString('config')
            const syntax = `curl -o \"/home/lch/aura-bot/maps/${filename}\" ${url}`

            if (config) {
                const data = `map_path = \"maps\\${filename}\"\nmap_type =\nmap_localpath = \"${filename}\"`

                fs.writeFile(`/home/lch/aura-bot/mapcfgs/${config}.cfg`, data, 'utf8', error => {
                    if (error) throw error
                })
            }

            await execShellCommand(syntax)

            await interaction.editReply({
                content: `${filename} ${config} uploaded.`,
            })
        }
    },
} as ICommand