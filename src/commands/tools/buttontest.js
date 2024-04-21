const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("button!"),

	async execute(interaction) {
		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Ban')
			.setStyle(ButtonStyle.Primary);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder()
		    .addComponents(cancel, confirm);

        await interaction.reply({
            content: 'Test Buttons',
            components: [row],
        });
	},
}
//buttons, default to two
//title is question/poll 'are whales cool'
//