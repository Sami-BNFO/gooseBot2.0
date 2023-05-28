const {
	SlashCommandBuilder,
	ChannelType,
	PermissionsBitField,
	PermissionFlagsBits,
} = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("ticket")
	.setDescription("Create a ticket")
	.addStringOption((option) =>
		option
			.setName("question")
			.setDescription("What is your question?")
			.setRequired(true)
	);

module.exports = {
	data: data,
	async execute(interaction, bot) {
		const question =
			interaction.options.getString("question");
		const ticketNotificationChannel =
			interaction.guild.channels.cache.get(
				"1107336486610817042"
			);
		const ticketChannel =
			await interaction.guild.channels.create({
				name: `ticket-${interaction.user.username}`,
				type: ChannelType.GuildText,
				permissionOverwrites: [
					{
						id: interaction.guild.roles.everyone,
						deny: [PermissionsBitField.Flags.ViewChannel],
					},
					{
						id: interaction.user.id,
						allow: [
							[PermissionsBitField.Flags.ViewChannel],
							[
								PermissionsBitField.Flags
									.ReadMessageHistory,
							],
							[PermissionsBitField.Flags.SendMessages],
							[PermissionsBitField.Flags.ManageChannels],
						],
					},
					{
						id: "1068919647417663558",
						allow: [
							[PermissionsBitField.Flags.ViewChannel],
							[
								PermissionsBitField.Flags
									.ReadMessageHistory,
							],
							[PermissionsBitField.Flags.SendMessages],
							[PermissionsBitField.Flags.ManageChannels],
						],
					},
				],
			});
		ticketChannel.setParent("1112025532335407234", {
			lockPermissions: false,
		});
		await ticketChannel.send(
			`<@${interaction.user.id}> Asked:\n${question}\n\n*Someone will assist you shortly.* `
		);
		await ticketNotificationChannel.send(
			`Ticket created: ${ticketChannel}\nTime created: ${new Date()}`
		);
		await interaction.reply({
			content: `Channel setup!\n ${ticketChannel}`,
			ephemeral: "true",
		});
	},
};

//make duplicate channels no
//ticketname exists alr, then send "cant do that"
