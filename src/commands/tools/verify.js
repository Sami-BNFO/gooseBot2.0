const {
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	PermissionFlagsBits,
	ActionRowBuilder,
	ButtonStyle,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("createVerify")
		.setDescription("Sets up your verification channel")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("Select the verification channel")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const channel = interaction.option.getChannel("channel");
		const vembed = new EmbedBuilder()
			.setTitle("Verification")
			.setDescription(
				`Hello and Welcome!\nPlease make sure to read and follow the rules\nClick on the verify button to get started`
			)
			.setColor("Random");
		let sendChannel = channel.send({
			embeds: [vembed],
			components: [
				new ActionRowBuilder().setComponents(
					new ButtonBuilder()
						.setCustomId("verified")
						.setLabel("Verify")
						.setStyle(ButtonStyle.Success)
				),
			],
		});
		if (!sendChannel) {
			return interaction.reply({
				content: "Channel does not exist",
				ephemeral: true,
			});
		} else {
			return interaction.reply({
				content: "Verification Channel set up!",
				ephemeral: true,
			});
		}
	},
};
