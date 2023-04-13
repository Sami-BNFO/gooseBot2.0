const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("insults")
		.setDescription("Insults a user")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("Who do you want to insult?")
				.setRequired(true)
		),

	async execute(interaction, bot) {
		let insults = [
			["ur mom", [" is so fat"]],
			[
				"You hear that?",
				[
					" That's the sound of no one caring.",
					" No? Oh, I must have the wrong number.",
				],
			],
		];
		let gif =
			"https://media.giphy.com/media/XGPbVDSbBm70i0P2P4/giphy.gif";
		const seedInsult = Math.floor(
			Math.random() * insults.length
		);
		const randomInsult = Math.floor(
			Math.random() * insults[seedInsult][1].length
		);
	},
};
