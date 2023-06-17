const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription(
			"Let goose answer your most philosophical questions"
		)
		.addStringOption((option) =>
			option
				.setName("question")
				.setDescription("What is your question?")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("tomfoolery")
				.setDescription(
					"You feel lucky, the odds are in your favor."
				)
				.addChoices(
					{ name: "Yes (change fate)", value: "yes" },
					{ name: "No (change fate)", value: "no" }
				)
		),

	async execute(interaction, bot) {
		const answers = [
			[
				"yes",
				"YES!",
				"I'd say so, yeah.",
				"Without a doubt!",
				"Of course!",
				"Absolutely, positively, indubitably, without a shadow of a doubt, most likely!",
				"The goose has spoken: yes.",
			], // YES [0]
			[
				"no",
				"NO!",
				"Of course not!",
				"Definitely not!",
				"Not a CHANCE!",
				"The goose has spoken: no.",
				"Not in a million years, buddy.",
			], // NO [1]
			[
				"I'm a goose, not a wizard",
				"You're asking the wrong goose",
				"The goose has spoken: what.",
				"Honk!",
				"Sorry, I'm not in the mood for existential questions.",
				"Can't answer that, I'm on my coffee break.",
				"I'm an 8-ball, not a genie. Ask nicely next time.",
			], //MISC [2]
		];
		const question =
			interaction.options.getString("question");
		const answerType =
			interaction.options.getString("tomfoolery") || "";

		let responses = answers.flat();
		let chosenResponse = "";

		if (answerType === "yes") {
			const opt = Math.floor(
				Math.random() * answers[0].length
			);
			chosenResponse = answers[0][opt];
		} else if (answerType === "no") {
			const opt = Math.floor(
				Math.random() * answers[1].length
			);
			chosenResponse = answers[1][opt];
		} else {
			chosenResponse =
				responses[
					Math.floor(Math.random() * responses.length)
				]; //includes misc
		}

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
				value: `${chosenResponse}`,
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
