import WOKCommands, { ICommand } from "wokcommands";
import { delay, execShellCommand } from "../helpers/global";

export default {
    name: 'restart',
    category: 'Configuration',
    description: 'Restart Aura Bot (root admin only)',
    ownerOnly: (process.env.USAGE == "public") ? true:false,
    slash: true,
    testOnly: (process.env.NODE_ENV == "development") ? true:false,

    callback: async ({ interaction, args }) => {
        if (interaction) {
            await interaction.reply({
                content: "restarting arua bot"
            })
            
            await execShellCommand("pkill aura++")

            await delay(5)

            await execShellCommand(`nohup ${process.env.AURABOT_ADDRESS}/aura++ > ${process.env.AURABOT_ADDRESS}/aura.log 2>&1 &`)

            await delay(5)

            await interaction.editReply({
                content: "restarted"
            })
        }
    },
} as ICommand