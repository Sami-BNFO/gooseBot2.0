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
					contents: `Something went wrong while executing this command, plase inform the dev\n<:discordIcon:1119999238357667942> @bnfo`,
					ephemeral: true,
				});
			}
		} else if (interaction.isButton()) {
			const { buttons } = bot;
			const { customId } = interaction;
			//console.log('Button clicked: '+customId)
			const button = buttons.get(customId); //maybe error on this line :)
			if (!button ) return new Error('no custom ID for this button');
			
			try {
				await button.execute(interaction, bot); //
			} catch (err) {
				console.error(err);
				await interaction.reply({
					contents: `Something went wrong while executing this button, plase inform the dev\n<:discordIcon:1119999238357667942> @bnfo`,
					ephemeral: true,
				});
			}
		}
	},
};
