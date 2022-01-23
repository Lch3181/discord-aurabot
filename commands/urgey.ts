import WOKCommands, { ICommand } from "wokcommands";
import { delay } from "../global";

export default {
    name: 'urgey',
    category: 'Fun',
    description: 'Yes',
    cooldown: '5s',

    slash: true,
    guildOnly: true,

    callback: async ({ interaction, args }) => {
        if (interaction) {
            await interaction.reply({
                content: "you too"
            })
            
            await delay(1000)

            await interaction.editReply({
                content: "<:urgey:785250321298882560>",
            })
        }
    },
} as ICommand