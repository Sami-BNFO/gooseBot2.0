const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Ping... Pong..."),

	async execute(interaction, bot) {
		await interaction.reply({
			contents: `API Latency: ${Math.round(bot.ws.ping)}ms`,
			ephemeral: true,
		});
	},
};
