// roleAssign.js
const {
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	SlashCommandBuilder,
} = require('discord.js');

function createRoleButton(roleId) {
	console.log('createRoleButton called with ' + roleId);
	return new ButtonBuilder()
		.setCustomId(`assign-role-${roleId}`) // This ID links the button to the `roleButton.js` logic.
		.setLabel('Click to get role')
		.setStyle(ButtonStyle.Primary);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buttontest')
		.setDescription('testing buttons')
		.addRoleOption((option) =>
			option
				.setName('role')
				.setDescription('The role to give to the user.')
				.setRequired(true)
		),

	async execute(interaction, bot) {
		const role = interaction.options.getRole('role');
		const row = new ActionRowBuilder().addComponents(createRoleButton(role.id));

		await interaction.reply({
			content: 'roleassign.js test',
			components: [row],
		});
	},
};
