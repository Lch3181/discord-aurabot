import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../global";

export default {
    name: 'ban',
    category: 'Configuration',
    description: 'edit bot banlist',
    cooldown: '5s',
    guildOnly: true,
    options: [
        {
            name: 'add',
            description: 'add user to banlist',
            type: 1,
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
        },
        {
            name: 'remove',
            description: 'remove user from banlist',
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
            description: 'list ban(s)',
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

            let query = 'sqlite3 ~/aura-bot/aura.dbs -header '
            const username = interaction.options.getString('username')?.toLowerCase()
            const reason: string = interaction.options.getString('reason') ? interaction.options.getString('reason') as string : ''
            switch (interaction.options.getSubcommand()) {
                case 'add':
                    query += `"INSERT INTO bans (name, server, date, admin, reason) SELECT '${username}', 'server.eurobattle.net', date('now'), '${interaction.user.tag}', '${reason}' WHERE NOT EXISTS (SELECT name FROM bans WHERE name = '${username}') RETURNING *"` as const
                    break
                case 'remove':
                    query += `"DELETE FROM bans WHERE name = '${username}' RETURNING *"` as const
                    break
                case 'list':
                    if (username) {
                        query += `"SELECT name, date, admin, reason FROM bans WHERE name = '${username}'"`
                    } else {
                        query += `"SELECT name FROM bans ORDER BY name"`
                    }
                    break
            }

            //execute query
            let result = await execShellCommand(query) as string

            //output
            if (result) {
                switch (interaction.options.getSubcommand()) {
                    case 'add':
                        result = `${username} added to banlist\n${result}`
                        break
                    case 'remove':
                        result = `${username} removed from banlist\n${result}`
                        break
                    case 'list':
                        if (username) {
                            result = `${username} is banned\n${result}`
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
                        if (username) {
                            result = `${username} is not banned`
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
