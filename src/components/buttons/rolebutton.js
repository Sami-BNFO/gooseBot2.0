module.exports = {
	data: {
		name: 'assign-role-', // This must match the custom ID prefix used when creating buttons.
	},

	async execute(interaction, bot) {
		console.log('roleButton.js executed');
		const roleId = interaction.customId.split('-')[2]; // Assuming the custom ID format is "assign-role-<roleId>"
		const role = interaction.guild.roles.cache.get(roleId);
		if (!role) {
			await interaction.reply({
				content: 'Role does not exist.',
				ephemeral: true,
			});
			return;
		}

		const member = interaction.member;
		if (member.roles.cache.has(roleId)) {
			await interaction.reply({
				content: 'You already have this role!',
				ephemeral: true,
			});
		} else {
			await member.roles.add(role);
			await interaction.reply({
				content: `You have been given the ${role.name} role!`,
				ephemeral: true,
			});
		}
	},
};
