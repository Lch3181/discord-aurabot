import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../helpers/global";

export default {
    name: 'unban',
    category: 'Configuration',
    description: 'unban a user (root admin only)',
    cooldown: '5s',
    ownerOnly: (process.env.USAGE == "public") ? true:false,
    guildOnly: true,
    options: [
        {
            name: 'username',
            description: 'user\'s ingame name',
            required: true,
            type: 3,
        }
    ],

    slash: true,
    testOnly: (process.env.NODE_ENV == "development") ? true:false,

    callback: async ({ interaction }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            let query = 'sqlite3 ~/aura-bot/aura.dbs -header '
            const username = interaction.options.getString('username')?.toLowerCase()
            const reason: string = interaction.options.getString('reason') ? interaction.options.getString('reason') as string : ''
            query += `"DELETE FROM bans WHERE name = '${username}' RETURNING *"` as const

            //execute query
            let result = await execShellCommand(query) as string

            //output
            if (result) {
                result = `${username} unbanned` +
                    `\`\`\`${result}\`\`\``
            } else {
                result = `${username} is not banned`
            }

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand
