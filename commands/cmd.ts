import WOKCommands, { ICommand } from "wokcommands";
import { execShellCommand } from "../global";

export default {
    name: 'cmd',
    category: 'Configuration',
    description: 'Using Command Prompt (root admin only)',
    ownerOnly: true,
    options: [{
        name: 'syntax',
        description: 'bot owner only',
        required: true,
        type: 3,
    }],

    slash: true,

    callback: async ({ interaction, args }) => {
        if (interaction) {
            await interaction.deferReply({
            })
            
            const result = await execShellCommand(args[0]) as string

            await interaction.editReply({
                content: `\`\`\`cmd\n${result}\`\`\``,
            })
        }
    },
} as ICommand