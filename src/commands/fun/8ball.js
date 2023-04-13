const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Imports SlashCommandBuilder and EmbedBuilder from discord.js

module.exports = {
	data: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription(
			"Let goose answer your most philisophical questions"
		)
		.addStringOption((option) =>
			option
				.setName("question")
				.setDescription("What is your question?")
				.setRequired(true)
		),

	async execute(interaction, bot) {
		//runs the code
		const answers = [
			"I guess?",
			"no lol",
			"Obviously, duh",
			"nope",
			"thats literally the dumbest question I've ever heard, try something better.",
			"YES",
			"NO",
			"sure, why not",
			"Did you fail school?? Obviously not.",
			"What does that even mean?",
			"No hablo espanol",
			"Oui",
			"oo (tämä on suomalainen)",
			"番号 (これは日本人です)",
		];
		const question =
			interaction.options.getString("question");
		const randomNum = Math.floor(
			Math.random() * answers.length
		);
		const embed = new EmbedBuilder()
			.setTitle(`${interaction.user.tag} asked:`)
			.setAuthor({
				name: "Goose",
				iconURL:
					"https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
			})
			.setThumbnail(
				"https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/672-pool-8-ball.svg/768px-672-pool-8-ball.svg.png"
			)
			.setDescription(`${question}`)
			.addFields({
				name: "The magic 8ball says",
				value: `${answers[randomNum]}`,
				inline: true,
			})
			.setColor(0xe3c05f)
			.setTimestamp(Date.now())
			.setFooter({
				text: ` \n Asked by ${interaction.user.tag} in ${interaction.guild.name}`,
			});

		await interaction.reply({
			embeds: [embed],
		});
	},
};
