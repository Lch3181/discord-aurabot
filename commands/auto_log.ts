import { ICommand } from "wokcommands";
import keyFileStorage from 'key-file-storage'
const kfs = keyFileStorage('./config')

export default {
    name: 'auto_log',
    category: 'Configuration',
    description: 'choose a channel to watch aura.log',
    ownerOnly: (process.env.USAGE == "public") ? true:false,
    guildOnly: true,
    globalCooldown: '1m',
    options: [
        {
            name: 'channel',
            description: 'choose a channel to receive logs',
            required: true,
            type: 7
        }
    ],

    slash: true,
    testOnly: (process.env.NODE_ENV == "development") ? true:false,

    callback: async ({ interaction }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            const channel = interaction.options.getChannel('channel')

            kfs["auto_log_channel_id"] = channel!.id

            //output
            var result = `now sending logs to ${channel}`

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand
