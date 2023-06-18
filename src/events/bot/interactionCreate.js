const { GateWayIntentBits } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	async execute(interaction, bot) {
		if (interaction.isChatInputCommand()) {
			const { commands } = bot;
			const { commandName } = interaction;
			const command = commands.get(commandName);

			if (!command) return;

			try {
				await command.execute(interaction, bot);
			} catch (err) {
				console.error(err);
				await interaction.reply({
					contents: `Something went wrong while executing this command, plase inform the dev\n<:discordIcon:1119999238357667942> @youtuber.`,
					ephemeral: true,
				});
			}
		}
	},
};
