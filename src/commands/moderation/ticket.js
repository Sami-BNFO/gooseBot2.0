const {
	SlashCommandBuilder,
	ChannelType,
	PermissionsBitField,
	EmbedBuilder,
} = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('ticket')
	.setDescription('Create a ticket')
	.addStringOption((option) =>
		option
			.setName('question')
			.setDescription('What is your question?')
			.setRequired(true)
	);

module.exports = {
	data: data,
	async execute(interaction, bot) {
		if (interaction.channelId !== process.env.createTicketChannelID) {
			await interaction.reply({
				content: 'This command can only be used in #create-ticket!',
				ephemeral: true,
			});
			return;
		}
		const serverName = interaction.guild.name;
		const Boticon = 'https://cdn-icons-png.flaticon.com/512/2826/2826187.png';
		const question = interaction.options.getString('question');
		const ticketNotificationChannel = interaction.guild.channels.cache.get(
			process.env.TicketNotifChannelID
		);
		const existingTicketChannel = interaction.guild.channels.cache.find(
			(channel) =>
				channel.type === ChannelType.GuildText &&
				channel.name === `ticket-${interaction.user.username}`
		);
		if (existingTicketChannel) {
			await interaction.reply({
				content: `You already have an active ticket!\n ${existingTicketChannel}`,
				ephemeral: true,
			});
			return;
		}

		const ticketChannel = await interaction.guild.channels.create({
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
						[PermissionsBitField.Flags.ReadMessageHistory],
						[PermissionsBitField.Flags.SendMessages],
						[PermissionsBitField.Flags.ManageChannels],
					],
				},
				{
					id: process.env.AdminUserID,
					allow: [
						[PermissionsBitField.Flags.ViewChannel],
						[PermissionsBitField.Flags.ReadMessageHistory],
						[PermissionsBitField.Flags.SendMessages],
						[PermissionsBitField.Flags.ManageChannels],
					],
				},
			],
		});
		ticketChannel.setParent(process.env.TicketParentChannelID, {
			lockPermissions: false,
		});
		await ticketChannel.send(
			`<@${interaction.user.id}> Asked:\n${question}\n\n*Someone will assist you shortly.* `
		);

		const ticketNotif = new EmbedBuilder()

			.setTitle(`**NEW TICKET**`)
			.setAuthor({ name: 'Goose', iconURL: `${Boticon}` })
			.setThumbnail('https://img.freepik.com/free-icon/coupon_318-534561.jpg')
			.addFields(
				{
					name: 'Ticket created: ',
					value: `${ticketChannel}`,
				},
				{ name: 'Time created: ', value: `${new Date()}` },
				{
					name: 'Question: ',
					value: `${question}`,
				},
				{
					name: 'Asked by: ',
					value: `${interaction.user.tag}\n${interaction.user.id}`,
				}
			)
			.setTimestamp(Date.now())
			.setFooter({
				text: ` \n Asked by ${interaction.user.tag} in ${serverName}`,
			})
			.setColor(0xe3c05f);

		await ticketNotificationChannel.send({
			embeds: [ticketNotif],
		});
		await interaction.reply({
			content: `Channel setup!\n ${ticketChannel}`,
			ephemeral: 'true',
		});
	},
};
