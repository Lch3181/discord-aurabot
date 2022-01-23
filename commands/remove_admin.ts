import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../global";

export default {
    name: 'remove_admin',
    category: 'Configuration',
    description: 'remove user from admin (root admin only)',
    cooldown: '5s',
    guildOnly: true,
    ownerOnly: true,
    options: [
        {
            name: 'username',
            description: 'user\'s ingame name',
            required: true,
            type: 3,
        }
    ],

    slash: true,

    callback: async ({ interaction }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            let query = 'sqlite3 ~/aura-bot/aura.dbs -header '
            const username = interaction.options.getString('username')?.toLowerCase()
            query += `"DELETE FROM ADMINS WHERE name = '${username}' RETURNING *"` as const

            //execute query
            let result = await execShellCommand(query) as string

            //output
            if (result) {
                result = `${username} removed user from admin\`\`\`` +
                    `${result}\`\`\``
            } else {
                result = `${username} is not an admin`
            }

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand