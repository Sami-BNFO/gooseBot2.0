const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testbutton')
        .setDescription('Test the button'),
    async execute(interaction) {
        const button = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Confirm Ban')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({
            content: 'Click here to get your role',
            components: [row],
        });
    },
};
