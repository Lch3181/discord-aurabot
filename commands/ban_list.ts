import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../global";

export default {
    name: 'ban_list',
    category: 'Configuration',
    description: 'check ban list or specific user',
    cooldown: '5s',
    guildOnly: true,
    options: [
        {
            name: 'username',
            description: 'user\'s ingame name',
            required: false,
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
            const reason: string = interaction.options.getString('reason') ? interaction.options.getString('reason') as string : ''
            if (username) {
                query += `"SELECT name, date, admin, reason FROM bans WHERE name = '${username}'"`
            } else {
                query += `"SELECT name FROM bans ORDER BY name"`
            }

            //execute query
            let result = await execShellCommand(query) as string

            //output
            if (result) {
                if (username) {
                    result = `${username} is banned\n` +
                    `\`\`\`${result}\`\`\``
                } else {
                    result = `Enter user name to check datails\`\`\`${result.replace(/\n/g, " ")}\`\`\``
                }
            } else {
                if (username) {
                    result = `${username} is not banned`
                } else {
                    result = 'empty'
                }
            }

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand
