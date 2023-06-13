import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../helpers/global";

export default {
    name: 'ban',
    category: 'Configuration',
    description: 'ban a user (root admin only)',
    cooldown: '5s',
    ownerOnly: (process.env.USAGE == "public") ? true:false,
    guildOnly: true,
    options: [
        {
            name: 'username',
            description: 'user\'s ingame name',
            required: true,
            type: 3,
        },
        {
            name: 'reason',
            description: 'the reason to ban user',
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
            query += `"INSERT INTO bans (name, server, date, admin, reason) SELECT '${username}', 'server.eurobattle.net', date('now'), '${interaction.user.tag}', '${reason}' WHERE NOT EXISTS (SELECT name FROM bans WHERE name = '${username}') RETURNING *"` as const

            //execute query
            let result = await execShellCommand(query) as string

            //output
            if (result) {
                result = `${username} banned` +
                    `\`\`\`${result}\`\`\``
            } else {
                result = `${username} already banned`
            }

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand
