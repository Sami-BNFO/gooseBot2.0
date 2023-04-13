const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js");

//this creates the /kick command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("insults")
		.setDescription("new and improved")
		.addUserOption(
			(option) =>
				option
					.setName("name")
					.setDescription("who are we bullying")
					.setRequired(true) //
		),

	async execute(interaction, bot) {
		const user = interaction.options.getUser("name");
		if (user.id === bot.user.id) {
			return interaction.reply({
				content: "I won't insult myself.",
			});
		}
		let insults = [
			[
				"ur mom",
				[
					" is so fat",
					"'s so fat, when she fell I didn't laugh, but the sidewalk cracked up.",
					" so dumb, she thought Twitter was social media for birds.",
					"'s so stupid, she got hit by a parked car.",
					"'s so stupid, she tried to eat Eminem.",
					" so stupid, she climbed over a glass wall to see what was on the other side.",
					"'s so ugly, she threw a boomerang and it refused to come back.",
					"'s so ugly, her portraits hang themselves.",
					"'s so ugly, she could make an onion cry.",
					"'s so short, you can see her feet on her driver's license.",
				],
			],
			[
				"You hear that?",
				[
					" That's the sound of no one caring.",
					" That's the sound of your stupidity deafening everyone around you.",
					" That's the sound of your IQ hitting rock bottom.",
					" That's the sound of your credibility disappearing.",
					" That's the sound of your arguments crumbling.",
				],
			],
			[
				"You're so dumb that",
				[
					" a brick wall is smarter than you!",
					" you make a rock look like a genius.",
					" if stupidity was a currency, you'd be a millionaire.",
					"you need a GPS to find your own shadow.",
					"you have an IQ of the average room temperature.",
					"you couldn't spell 'cat' if you were given the 'c' and the 't'.",
				],
			],
			[
				"I'm amazed that you manage to function in society, considering how",
				[
					" you couldn't find your way out of a paper bag.",
					" you couldn't count to ten with a calculator.",
					" you're as sharp as a marble.",
					" you're as dense as a tungsten bar",
				],
			],
		];
		const seedInsult = Math.floor(
			Math.random() * insults.length
		);
		// console.log(seedInsult);
		const randomInsult = Math.floor(
			Math.random() * insults[seedInsult][1].length
		);
		// console.log(randomInsult);
		return interaction.reply({
			content: `Hey ${user},\n${insults[seedInsult][0]}${insults[seedInsult][1][randomInsult]}`,
			ephemeral: false,
		});
	},
};
