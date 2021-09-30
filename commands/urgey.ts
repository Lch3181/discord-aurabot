import WOKCommands, { ICommand } from "wokcommands";

export default {
    name: 'urgey',
    category: 'Fun',
    description: 'Yes',
    cooldown: '5s',

    slash: true,
    testOnly: true,

    callback: async ({ interaction, args }) => {
        if (interaction) {
            interaction.reply({
                content: "you too"
            })

            await interaction.followUp({
                content: "<:urgey:785250321298882560>",
            })
        }
    },
} as ICommand