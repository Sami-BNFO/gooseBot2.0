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
		const reactions = [
			"<:1_:1122185843310866564>",
			"<:2_:1122185829637443615>",
			"<:3_:1122185832095297656>",
			"<:4_:1122185833642995774>",
			"<:5_:1122185842031603763>",
			"<:6_:1122185835857576027>",
			"<:7_:1122185837438828545>",
			"<:8_:1122185838651002920>",
			"<:9_:1122185840790085713>",
		];
		let string = "";
		if (choices.length == 1) {
			string = `<:yes:1122176407729082449> ${choices[0]}`;
		} else if (choices.length == 2) {
			string = `<:yes:1122176407729082449> ${choices[0]}\n<:no:1122176379409141820> ${choices[1]}`;
		} else {
			for (let i = 0; i < choices.length; i++) {
				string = string + `${reactions[i]} ${choices[i]}\n`; //choices[1]
			}
		}

		const embed = new EmbedBuilder()
			.setTitle(`POLL!\n${question}`)
			.setDescription(string);
		const message = await interaction.reply({
			embeds: [embed],
			fetchReply: true,
		});
		if (choices.length == 1) {
			message.react("<:yes:1122176407729082449>");
		} else if (choices.length == 2) {
			// console.log(choices.length);
			message.react("<:yes:1122176407729082449>");
			message.react("<:no:1122176379409141820>");
		} else {
			for (let i = 0; i < choices.length; i++) {
				// console.log(choices.length);
				message.react(reactions[i]);
			}
		}
	},
};
