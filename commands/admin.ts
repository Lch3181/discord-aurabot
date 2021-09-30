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
        }
    ],

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            let query = ``
            switch (interaction.options.getSubcommand()) {
                case 'add':
                    query = `sqlite3 ~/aura-bot/aura.dbs \"INSERT INTO ADMINS (name, server) VALUES ('${interaction.options.getString('username')!.toLowerCase()}', 'server.eurobattle.net') RETURNING *\"` as const
                    break
                case 'remove':
                    query = `sqlite3 ~/aura-bot/aura.dbs \"DELETE FROM ADMINS WHERE name = '${interaction.options.getString('username')!.toLowerCase()}' RETURNING *\"` as const
                    break
                default:
                    break
            }

            const result = await execShellCommand(query) as string

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand
