const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("rps") //names the command
		.setDescription(
			"Paper shouldn't beat rock, but here we are."
		) //sets the description (bit under the name)
		.addStringOption((option) =>
			option
				.setName("weapon")
				.setDescription("I'd go for rock if I were you")
				.setRequired(true)
				.addChoices(
					{ name: "🪨", value: "Rock" },
					{ name: "📄", value: "Paper" },
					{ name: "✂", value: "Scissors" }
				)
		),

	async execute(interaction, bot) {
		const choice = interaction.options.getString("weapon");
		const gooseOptions = ["Rock", "Paper", "Scissors"];
		let wl;
		let thumbnail;
		let title;

		const winThumb =
			"https://icons.veryicon.com/png/o/business/business-style-icon/trophy-18.png";
		const loseThumb =
			"https://cdn3.emoji.gg/emojis/1304-really.png";
		const tie =
			"https://hotsigns.net/assets/images/emogee%20175.png";
		gooseChoice =
			gooseOptions[
				Math.floor(Math.random() * gooseOptions.length)
			];
		if (choice === gooseChoice) {
			title = "You tied!";
			wl = `You tied!\nYou both chose ${choice}.`;
			thumbnail = tie;
		} else if (choice === "Rock") {
			//Player Rock
			if (gooseChoice === "Paper") {
				title = "You lost!";
				wl = `You chose ${choice}, but Goose chose ${gooseChoice}...\nGoose Won!`;
				thumbnail = loseThumb;
			} else {
				title = "You won!";
				wl = `You chose ${choice}, and Goose chose ${gooseChoice}...\nYou Won!`;
				thumbnail = winThumb;
			}
		} else if (choice === "Paper") {
			//Player Paper
			if (gooseChoice === "Scissors") {
				title = "You lost!";
				wl = `You chose ${choice}, but Goose chose ${gooseChoice}...\nGoose Won!`;
				thumbnail = loseThumb;
			} else {
				title = "You won!";
				wl = `You chose ${choice}, and Goose chose ${gooseChoice}...\nYou Won!`;
				thumbnail = winThumb;
			}
		} else if (choice === "Scissors") {
			//Player Scissors
			if (gooseChoice === "Rock") {
				title = "You lost!";
				wl = `You chose ${choice}, but Goose chose ${gooseChoice}...\nGoose Won!`;
				thumbnail = loseThumb;
			} else {
				title = "You won!";
				wl = `You chose ${choice}, and Goose chose ${gooseChoice}...\nYou Won!`;
				thumbnail = winThumb;
			}
		}
		//here
		const embed = new EmbedBuilder()
			.setTitle(title)
			.setAuthor({
				name: "Goose",
				iconURL:
					"https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
			})
			.setThumbnail(thumbnail)
			.setDescription(`${wl}\nGG!`)
			.setColor(0xe3c05f)
			.setTimestamp(Date.now())
			.setFooter({
				text: ` \n Asked by ${
					interaction.user.tag.split("#")[0]
				} in ${interaction.guild.name}`,
			});

		await interaction.reply({
			embeds: [embed],
		});
	},
};
