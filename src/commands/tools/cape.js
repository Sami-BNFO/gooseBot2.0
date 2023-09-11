const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("cape") //names the command
		.setDescription("finds the cape of selected user") //sets the description (bit under the name)
        .addUserOption(
			(option) =>
				option
					.setName("name")
					.setDescription("Please enter a Minecraft username")
					.setRequired(true)
		),
	async execute(interaction, bot) {
        const user = interaction.options.getUser("name");
		const embed = new EmbedBuilder()
			.setTitle(user+"'s cape")
			.setAuthor({
				name: "CapeBot",
				iconURL:
					"https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
			})
			.setThumbnail(
				"https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f3d3.png"
			)
			.setDescription(
				`API Latency: ${Math.round(bot.ws.ping)}ms\n`
			)
			.setColor(0xe3c05f)
			.setTimestamp(Date.now())
			.setFooter({
				text: `Made with ❤️`,
			});

		await interaction.reply({
			embeds: [embed],
		});
	},
};
