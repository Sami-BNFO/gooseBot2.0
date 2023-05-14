const { SlashCommandBuilder } = require("@discordjs");

const data = new SlashCommandBuilder()
	.setName("ticket")
	.setDescription("Create a ticket")
	.addStringOption((option) =>
		option
			.setName("reason")
			.setDescription("Reason for creating a ticket")
			.setRequired(true)
	);

module.exports = {
	data: data,
	async execute(interaction) {
		const ticketNotificationChannel =
			interaction.guild.channels.cache.find(
				(c) => c.name === "ticket-notifications"
			);
		const ticketChannel =
			await interaction.guild.channels.create(
				`ticket-${interaction.user.username}`,
				{
					type: "text",
					permissionOverwrites: [
						{
							id: interaction.guild.roles.everyone,
							deny: ["VIEW_CHANNEL"],
						},
						{
							id: interaction.user.id,
							allow: [
								"VIEW_CHANNEL",
								"SEND_MESSAGES",
								"READ_MESSAGE_HISTORY",
							],
						},
						{
							id: interaction.guild.roles.cache.find(
								((r) => r.name === "Staff").id
							),
							allow: [
								"VIEW_CHANNEL",
								"SEND_MESSAGES",
								"READ_MESSAGE_HISTORY",
							],
						},
					],
				}
			);
		await ticketChannel.send(
			`${user}: ${reason},\n Hello we will be with you shortly.`
		);
		await ticketNotificationChannel.send(
			`Ticket created: ${ticketChannel}`
		);
	},
};
