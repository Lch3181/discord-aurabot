import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../global";

export default {
    name: 'addadmin',
    category: 'Configuration',
    description: 'add admin to bot',
    options: [{
        name: 'username',
        description: 'user\'s ingame name',
        required: true,
        type: 3,
    }],

    slash: true,
    testOnly: true,

    callback: async ({ interaction, args }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            const query = `sqlite3 ~/aura-bot/aura.dbs \"INSERT INTO ADMINS (name, server) VALUES ('${ args[0] }', 'server.eurobattle.net') RETURNING *\"`
            const result = await execShellCommand(query) as string

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand