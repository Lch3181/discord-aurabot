import WOKCommands, { ICommand } from "wokcommands";
import keyFileStorage from 'key-file-storage'
const kfs = keyFileStorage('./config')

export default {
    name: 'auto_upload_map',
    category: 'Configuration',
    description: 'choose a channel to follow map announcement and upload to server (root admin only)',
    ownerOnly: (process.env.USAGE == "public") ? true:false,
    guildOnly: true,
    globalCooldown: '1m',
    options: [
        {
            name: 'channel',
            description: 'choose a channel with map release annoucement',
            required: true,
            type: 7
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

            const channel = interaction.options.getChannel('channel')
            const config = interaction.options.getString('config_name')

            kfs["auto_follow_map_update_channel_id"] = channel!.id
            kfs["auto_follow_map_update_config_name"] = config

            //output
            var result = `now following ${channel} to upload map`
            if (config) {
                result = `now following ${channel} to upload map with config name: ${config}`
            }

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand
