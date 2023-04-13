const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js");

//this creates the /kick command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("realban")
		.setDescription("Bans a user from the guild")
		.addUserOption(
			(option) =>
				option
					.setName("name")
					.setDescription("Who do you want to ban")
					.setRequired(true) //
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason:")
				.setRequired(false)
		),

	async execute(interaction, bot) {
		const user = interaction.options.getUser("name");
		const reason =
			interaction.options.getString("reason") ||
			"No Reason Given";
		const footers = [
			"What a nerd!",
			"Imagine getting banned!",
			"Skill Issue",
			`Don't be like ${user.tag}!`,
			"💀",
		];
		const ranOption = Math.floor(
			Math.random() * footers.length
		);

		const banEmbed = new EmbedBuilder()
			.setTitle(`${user.tag} Has been banned!`)
			.setAuthor({
				name: "Goose",
				iconURL:
					"https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
			})
			.setThumbnail(
				"https://i.pinimg.com/originals/08/41/81/084181642c396ecaa191e085b73d5d61.png"
			)
			.addFields(
				{
					name: "Given Reason:\n",
					value: `${reason}`,
					inline: true,
				},
				{
					name: "Banned by:\n",
					value: `${interaction.user.tag}`,
				}
			)
			.setTimestamp(Date.now())
			.setFooter({ text: ` \n${footers[ranOption]}` })
			.setColor("DarkRed");

		if (user.id === bot.user.id) {
			return interaction.reply({
				content:
					"Goose feels betrayed, sleep with one eye open tonight.",
				ephemeral: true,
			});
		} else {
			return interaction.reply({
				embeds: [banEmbed],
			});
		}
	},
};
