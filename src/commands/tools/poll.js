const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("poll") //names the command
		.setDescription("Creates a simple poll") //sets the description (bit under the name)
		.addStringOption(
			(option) =>
				option
					.setName("question")
					.setDescription("What is the poll for?")
					.setRequired(true) //
		)
		.addStringOption((option) =>
			option
				.setName("choices")
				.setDescription("Seperate choices with a comma.")
				.setRequired(true)
		),
	async execute(interaction, bot) {
		const question =
			interaction.options.getString("question");
		const choices = interaction.options
			.getString("choices")
			.split(",")
			.map((option) => option.trim());
		if (choices.length > 9) {
			await interaction.reply({
				content: "Too many choices, max of 9.",
				ephemeral: true,
			});
			return;
		}
		const embed = new EmbedBuilder()
			.setTitle(`POLL!\n${question}`)
			.setDescription("test");
		const message = await interaction.reply({
			embeds: [embed],
			fetchReply: true,
		});
		if (!choices[1]) {
			await message.react("<:1_:1122185843310866564>");
		} else if (!choices[2]) {
			await message.react("<:1_:1122185843310866564>");
			await message.react("<:2_:1122185829637443615>");
		} else if (!choices[3]) {
			await message.react("<:1_:1122185843310866564>");
			await message.react("<:2_:1122185829637443615>");
			await message.react("<:3_:1122185832095297656>");
		} else if (!choices[4]) {
			await message.react("<:1_:1122185843310866564>");
			await message.react("<:2_:1122185829637443615>");
			await message.react("<:3_:1122185832095297656>");
			await message.react("<:4_:1122185833642995774>");
		} else if (!choices[5]) {
			await message.react("<:1_:1122185843310866564>");
			await message.react("<:2_:1122185829637443615>");
			await message.react("<:3_:1122185832095297656>");
			await message.react("<:4_:1122185833642995774>");
			await message.react("<:5_:1122185842031603763>");
		} else if (!choices[6]) {
			await message.react("<:1_:1122185843310866564>");
			await message.react("<:2_:1122185829637443615>");
			await message.react("<:3_:1122185832095297656>");
			await message.react("<:4_:1122185833642995774>");
			await message.react("<:5_:1122185842031603763>");
			await message.react("<:6_:1122185835857576027>");
		} else if (!choices[7]) {
			await message.react("<:1_:1122185843310866564>");
			await message.react("<:2_:1122185829637443615>");
			await message.react("<:3_:1122185832095297656>");
			await message.react("<:4_:1122185833642995774>");
			await message.react("<:5_:1122185842031603763>");
			await message.react("<:6_:1122185835857576027>");
			await message.react("<:7_:1122185837438828545>");
		} else if (!choices[8]) {
			await message.react("<:1_:1122185843310866564>");
			await message.react("<:2_:1122185829637443615>");
			await message.react("<:3_:1122185832095297656>");
			await message.react("<:4_:1122185833642995774>");
			await message.react("<:5_:1122185842031603763>");
			await message.react("<:6_:1122185835857576027>");
			await message.react("<:7_:1122185837438828545>");
			await message.react("<:8_:1122185838651002920>");
		} else if (!choices[9]) {
			await message.react("<:1_:1122185843310866564>");
			await message.react("<:2_:1122185829637443615>");
			await message.react("<:3_:1122185832095297656>");
			await message.react("<:4_:1122185833642995774>");
			await message.react("<:5_:1122185842031603763>");
			await message.react("<:6_:1122185835857576027>");
			await message.react("<:7_:1122185837438828545>");
			await message.react("<:8_:1122185838651002920>");
			await message.react("<:9_:1122185840790085713>");
		}

		// } else {
		// 	for (let i = 0; i < choices.length; i++) {
		// 		console.log(choices.length);
		// 		switch (i) {
		// 			default:
		// 				console.log();
		// 			case 0:
		// 				await message.react(
		// 					"<:yes:1122176407729082449>"
		// 				);
		// 			case 1:
		// 				await message.react(
		// 					"<:no:1122176379409141820>"
		// 				);
		// 			case 2:
		// 				await message.react(
		// 					"<:shinys:1122181838568423444>"
		// 				);
		// 			case 3:
		// 				await message.react(
		// 					"<:elects:1122181877537718322>"
		// 				);
		// 			case 4:
		// 				await message.react(
		// 					"<:moons:1122181813218066524>"
		// 				);
		// 		}
		// 	}
		// }
	},
};
