const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ticketclose")
		.setDescription("Closes the open ticket"),

	async execute(interaction, bot) {
		const channelID = interaction.channel.id;
		const delChannel = bot.channels.cache.get(channelID);

		if (
			delChannel.parentId !=
				process.env.TicketParentChannelID || //if parent is not TICKETS, or CHANNELID is #create-ticket
			channelID == process.env.createTicketChannelID
		) {
			await interaction.reply({
				content: `Can not delete this channel!\nIt is not a ticket.`,
				ephemeral: "true",
			});
		} else {
			delChannel.delete();
		}
	},
};
