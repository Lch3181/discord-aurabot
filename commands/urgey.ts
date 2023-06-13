import WOKCommands, { ICommand } from "wokcommands";
import { delay } from "../helpers/global";

export default {
    name: 'urgey',
    category: 'Fun',
    description: 'Yes',
    cooldown: '5s',

    slash: true,
    guildOnly: true,
    testOnly: (process.env.NODE_ENV == "development") ? true:false,

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