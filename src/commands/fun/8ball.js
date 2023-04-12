const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //imports SlashCommandBuilder and EmbedBuilder from discord.js

module.exports = {
	data: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription("WHAT DOES YOUR DESTINY ENTAIL!!!!!!")
		.addStringOption(
			(
				option //addStringOption adds an option to input a string, addIntOption would add an option to input an int son and so forth
			) =>
				option
					.setName("question")
					.setDescription(
						"What would you like to ask the magic 8ball?"
					)
					.setRequired(true)
		),

	async execute(interaction, bot) {
		const answer = ["answer a", "answer b", "answer c"];
		const question =
			interaction.options.getString("question");

		const randomNum = Math.floor(
			Math.random() * answer.length
		);

		const embed = new EmbedBuilder()
			.setTitle(`${interaction.user.tag} asked:`)
			.setDescription(`${question}`)
			.addFields([
				{
					name: `Magic 8ball says:`,
					value: `${answer[randomNum]}`,
					inline: true,
				},
			])
			.setColor("Random")
			.setTimestamp(Date.now())
			.setFooter({
				iconURL: `${interaction.user.displayAvatarURL()}`,
				text: `Asked by ${interaction.user.tag}`,
			});

		await interaction.reply({
			embeds: [embed],
		});
	},
};
