const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("purge")
		.setDescription("Let us purge these heretical messages!...")
		.addNumberOption((option) =>
			option
				.setName("amount")
				.setDescription("How many messages shall be purged?")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction, bot) {
		const amount = interaction.options.getNumber("amount");
		//what if the amount is -1? what about 0?
		//how do we know if this actually works? (try catch it)

		interaction.channel.bulkDelete(amount, true).size;

		interaction.reply({
			content: "Messages purged",
			ephemeral: true,
		});
	},
};
