const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping") //names the command
		.setDescription("Pings the bot"), //sets the description (bit under the name)

	async execute(interaction, bot) {
		const embed = new EmbedBuilder()
			.setTitle("Pings Goose")
			.setAuthor({
				name: "Goose",
				iconURL:
					"https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
			})
			.setThumbnail(
				"https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f3d3.png"
			)
			.setDescription(
				`API Latency: ${Math.round(bot.ws.ping)}ms`
			)
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
