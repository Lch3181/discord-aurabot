import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../helpers/global";

export default {
    name: 'admin_list',
    category: 'Configuration',
    description: 'list all admins or specific user',
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
    testOnly: (process.env.NODE_ENV == "development") ? true:false,

    callback: async ({ interaction }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            let query = 'sqlite3 ~/aura-bot/aura.dbs -header '
            const username = interaction.options.getString('username')?.toLowerCase()
            if(username) {
                query += `"SELECT * FROM ADMINS WHERE name = '${username}'"`
            } else {
                query += `"SELECT name FROM ADMINS ORDER BY name"`
            }

            //execute query
            let result = await execShellCommand(query) as string

            //output
            if (result) {
                if(username) {
                    result = `${username} is an admin` +
                        `\`\`\`${result}\`\`\``
                } else {
                    result = `\`\`\`${result.replace(/\n/g, " ")}\`\`\``
                }
            } else {
                if(username) {
                    result = `${username} is not admin`
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
