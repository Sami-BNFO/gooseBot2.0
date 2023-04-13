const {
	SlashCommandBuilder,
	PermissionFlagsBits,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("purge")
		.setDescription("Purges Chat History")
		.addNumberOption((option) =>
			option
				.setName("amount")
				.setDescription("Purge how many messages?")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(
			PermissionFlagsBits.ManageMessages
		),
	async execute(interaction, bot) {
		const amount = interaction.options.getNumber("amount");

		if (amount < 1) {
			return interaction.reply({
				content: "Number must be more than 1",
				ephemeral: true,
			});
		}

		try {
			//try the code
			await interaction.channel.bulkDelete(amount, true)
				.size;
		} catch (err) {
			console.error(err);
		}

		interaction.reply({
			content: "Messages purged",
			ephemeral: true,
		});
	},
};
