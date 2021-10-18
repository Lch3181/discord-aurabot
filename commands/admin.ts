import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../global";

export default {
    name: 'admin',
    category: 'Configuration',
    description: 'edit bot admin',
    cooldown: '5s',
    guildOnly: true,
    options: [
        {
            name: 'add',
            description: 'add user to admin',
            type: 1,
            options: [
                {
                    name: 'username',
                    description: 'user\'s ingame name',
                    required: true,
                    type: 3,
                }
            ],
        },
        {
            name: 'remove',
            description: 'remove user from admin',
            type: 1,
            options: [
                {
                    name: 'username',
                    description: 'user\'s ingame name',
                    required: true,
                    type: 3,
                }
            ],
        },
        {
            name: 'list',
            description: 'list admin(s)',
            type: 1,
            options: [
                {
                    name: 'username',
                    description: 'user\'s ingame name',
                    type: 3,
                }
            ],
        }
    ],

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            let query = 'sqlite3 ~/aura-bot/aura.dbs '
            const username = interaction.options.getString('username')?.toLowerCase()
            switch (interaction.options.getSubcommand()) {
                case 'add':
                    query += `"INSERT INTO ADMINS (name, server) SELECT '${username}', 'server.eurobattle.net' WHERE NOT EXISTS (SELECT name FROM admins WHERE name = '${username}') RETURNING *"` as const
                    break
                case 'remove':
                    query += `"DELETE FROM ADMINS WHERE name = '${username}' RETURNING *"` as const
                    break
                case 'list':
                    if(username) {
                        query += `"SELECT name FROM ADMINS WHERE name = '${username}'"`
                    } else {
                        query += `"SELECT name FROM ADMINS"`
                    }
                    break
            }

            //execute query
            let result = await execShellCommand(query) as string

            //output
            if (result) {
                switch (interaction.options.getSubcommand()) {
                    case 'add':
                        result = `${username} added`
                        break
                    case 'remove':
                        result = `${username} removed`
                        break
                    case 'list':
                        if(username) {
                            result = `${username} is admin`
                        } else {
                            result = result.replace(/(\r\n|\r|\n)/g, ' ')
                        }
                        break
                }
            } else {
                switch (interaction.options.getSubcommand()) {
                    case 'add':
                        result = `${username} already exist`
                        break
                    case 'remove':
                        result = `${username} does not exist`
                        break
                    case 'list':
                        if(username) {
                            result = `${username} is not admin`
                        } else {
                            result = 'empty'
                        }
                }
            }

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand
