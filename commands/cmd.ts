import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../global";

export default {
    name: 'cmd',
    category: 'Configuration',
    description: 'Using Command Prompt',
    hidden: true,
    ownerOnly: true,
    options: [{
        name: 'input',
        description: 'syntax for command',
        required: true,
        type: 3,
    }],

    slash: true,
    testOnly: true,

    callback: async ({ interaction, args }) => {
        if (interaction) {
            await interaction.deferReply({
            })

            const result = await execShellCommand(args[0]) as string

            await interaction.editReply({
                content: result,
            })
        }
    },
} as ICommand