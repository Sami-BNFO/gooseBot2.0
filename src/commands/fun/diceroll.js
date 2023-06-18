const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("diceroll") //names the command
		.setDescription("Rolls a dice!") //sets the description
		.addNumberOption(
			(
				option //adds a subcommand that asks for the question in the form of a string, while other varients exist for things like integers
			) =>
				option
					.setName("sides") //names the subcommand
					.setDescription(
						"How many sides does this dice have?"
					) //gives the subcommand a description
					.setRequired(true) //just makes it mandatory
		)
		.addNumberOption(
			(
				option //adds a subcommand that asks for the question in the form of a string, while other varients exist for things like integers
			) =>
				option
					.setName("frequency") //names the subcommand
					.setDescription(
						"How many times is the dice rolled?"
					) //gives the subcommand a description
					.setRequired(false) //just makes it mandatory
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

		min = Math.ceil(1);
		max = Math.floor(sides);

		randomNum = Math.floor(
			Math.random() * (max - min) + min
		);

		const embedDice = new EmbedBuilder()
			.setAuthor({ name: "Goose", iconURL: `${Boticon}` })
			.setDescription(
				`Rolling Dice...\nYou rolled a ${randomNum}!`
			)
			.setThumbnail(
				"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/2-Dice-Icon.svg/2048px-2-Dice-Icon.svg.png"
			)
			.setColor(0xe3c05f)
			.setTimestamp(Date.now())
			.setFooter({
				text: ` \n${
					interaction.user.tag.split("#")[0]
				} rolled a ${sides} sided dice! `,
			});

		await interaction.reply({
			embeds: [embedDice],
		});
	},
};

//Get the amount of sides
//Create a temporary loading screen
//show results
