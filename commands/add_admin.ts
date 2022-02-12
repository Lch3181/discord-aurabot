import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../global";

export default {
    name: 'add_admin',
    category: 'Configuration',
    description: 'add user to admin',
    cooldown: '5s',
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
            const username = interaction.options.getString('username')?.toLowerCase() as string
            query += `"INSERT INTO ADMINS (name, server) SELECT '${username}', 'server.eurobattle.net' WHERE NOT EXISTS (SELECT name FROM admins WHERE name = '${username}') RETURNING *"` as const

            //execute query
            let result = await execShellCommand(query) as string

            //output
            if (result.includes(username)) {
                result = `${username} added to admin` +
                    `\`\`\`${result}\`\`\``
                    
            //error
            } else if(result) {
                result = `Error <@227956824521834500>` + 
                    `\`\`\`${result}\`\`\``
            }else {
                result = `${username} already exist`
            }

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand
