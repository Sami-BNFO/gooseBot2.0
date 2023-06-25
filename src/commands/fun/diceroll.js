const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("diceroll")
		.setDescription("Rolls a dice!")
		.addNumberOption((option) =>
			option
				.setName("sides")
				.setDescription(
					"How many sides does this dice have?"
				)
				.setRequired(true)
		)
		.addNumberOption((option) =>
			option
				.setName("frequency")
				.setDescription(
					"How many times is the dice rolled?"
				)
				.setRequired(false)
		),

	async execute(interaction, bot) {
		const sides = interaction.options.getNumber("sides");
		const freq =
			interaction.options.getNumber("frequency") || 1;
		const Boticon =
			"https://cdn-icons-png.flaticon.com/512/2826/2826187.png";

		if (sides < 1) {
			return interaction.reply({
				content: "Sides must be greater than 0!",
				ephemeral: true,
			});
		}

		let rolls = [];
		let results = [];

		for (let i = 0; i < freq; i++) {
			min = Math.ceil(1);
			max = Math.floor(sides);

			randomNum = Math.floor(
				Math.random() * (max - min + 1) + min
			);
			rolls.push(randomNum);
			results.push(`Roll ${i + 1}: ${srandomNum}`);
		}

		const embedDice = new EmbedBuilder()
			.setAuthor({ name: "Goose", iconURL: `${Boticon}` })
			.setDescription(
				`Rolling A Dice ${freq} time(s)...\n\n${results.join(
					"\n"
				)}`
			)
			.setThumbnail(
				"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/2-Dice-Icon.svg/2048px-2-Dice-Icon.svg.png"
			)
			.setColor(0xe3c05f)
			.setTimestamp(Date.now())
			.setFooter({
				text: ` \n${
					interaction.user.tag.split("#")[0]
				} rolled a ${sides} sided dice ${freq} time(s)! `,
			});

		await interaction.reply({
			embeds: [embedDice],
		});
	},
};
