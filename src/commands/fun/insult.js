const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("insult")
		.setDescription(
			"For when you just cant think of the perfect comeback!"
		)
		.addUserOption(
			(option) =>
				option
					.setName("name")
					.setDescription("Who do you want to bully")
					.setRequired(true) //
		),

	async execute(interaction, bot) {
		const user = interaction.options.getUser("name");
		const yikes =
			"https://static-00.iconduck.com/assets.00/grimacing-face-emoji-512x512-s1c7dxyh.png";
		const excla =
			"https://em-content.zobj.net/source/skype/289/exclamation-mark_2757.png";
		const insults = [
			`${user.username}, you're so dull, you make a brick wall look interesting.`,
			`Hey ${user.username}, if I had a dollar for every time you said something stupid, I'd be a millionaire.`,
			`${user.username}, you're not even worth the dirt on my shoe.`,
			`${user.username}, you have the personality of a wet sponge.`,
			`${user.username}, you're about as useful as a screen door on a submarine.`,
			`${user.username}, your face looks like it was carved out of Play-Doh by a toddler.`,
			`I'd rather watch paint dry than spend five minutes in ${user.username}'s company.`,
			`${user.username}, you're so ugly, you could scare a hungry dog away from a steak.`,
			`${user.username}, your brain is as empty as a vacuum cleaner bag.`,
			`${user.username}, you're a waste of oxygen and should do the world a favor and stop breathing.`,
			`Your face is so ugly, ${user.username}, even your mother could hardly love you.`,
			`You are a pitiful excuse for a human being, ${user.username}, so useless that even a sewer rat would have more value than you.`,
			`You're a walking, talking disappointment, ${user.username}.`,
			`Your existence is an affront to all that is good in this world, ${user.username}.`,
			`I wouldn't trust you to take care of a houseplant, ${user.username}.`,
			`${user.username}, you are a festering pustule on the buttocks of society, a walking embodiment of human garbage, a failure in every conceivable way, and a disgrace to your family name. May your existence be forever plagued by misfortune and misery.`,
			`I bet your parents regret ever having you, ${user.username}.`,
			`You have the fashion sense of a blind clown, ${user.username}.`,
			`I'm amazed you can even remember your own name, ${user.username}.`,
			`${user.username}, you are a puerile ignoramus with the intellectual capacity of a mollusk.`,
			`You are loathsome and repugnant, ${user.username}, your very existence is an insult to the natural order. You are a festering sore on the face of humanity, a foul and noxious stench that pollutes the air. May your every waking moment be plagued by torment and anguish, and may your name be forever cursed by all who have the misfortune of crossing your path.`,
			`You're the epitome of human garbage, ${user.username}.`,
			"ur mom",
			"You're built like a broken radiator.",
			"You're built like a shattered garden gnome.",
			"You sound like a mosquito that got hit by a bus",
			"Everyday I wake up hoping you've fallen into a ditch with no means of communication.",
			"Bro's built like a lego figure",
		];
		const ranInsult = Math.floor(
			Math.random() * insults.length
		);

		const insultEmbed = new EmbedBuilder()
			.setTitle(
				`Hey ${user.username}!\n${
					interaction.user.tag.split("#")[0]
				} wants to say...`
			)
			.setAuthor({
				name: "Goose",
				iconURL:
					"https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
			})
			.setThumbnail(yikes)
			.setDescription(`${insults[ranInsult]}`)
			.setTimestamp(Date.now())
			.setFooter({
				text: `\nWhat an epic roast by ${
					interaction.user.tag.split("#")[0]
				}`,
			})
			.setColor(0xe3c05f);

		const insultSam = new EmbedBuilder()
			.setTitle(
				`Hey Guys! ${
					interaction.user.tag.split("#")[0]
				} tried to insult ${user.username}...`
			)
			.setAuthor({
				name: "Goose",
				iconURL:
					"https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
			})
			.setThumbnail(excla)
			.setDescription(
				`Go torch ${
					interaction.user.tag.split("#")[0]
				}\'s house down,\n40.741895,-73.989308\n255.70.216.95.\n78.114.9.47`
			)
			.setTimestamp(Date.now())
			.setFooter({ text: `\nvery real trust me` })
			.setColor(0xe3c05f);

		if (user.id === "1002697963375702070") {
			return interaction.reply({
				embeds: [insultSam],
			});
		}

		if (user.id === bot.user.id) {
			return interaction.reply({
				content: "kys",
				ephemeral: true,
			});
		} else {
			return interaction.reply({
				embeds: [insultEmbed],
			});
		}
	},
};
