const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ticketclose")
		.setDescription("Closes the open ticket"),

	async execute(interaction, bot) {
		const channelID = interaction.channel.id;
		const delChannel = bot.channels.cache.get(channelID);

		if (
			delChannel.parentId != "1112025532335407234" ||
			channelID == "1112026106682417202"
		) {
			await interaction.reply({
				content: `Can not delete this channel!\nIt is not a ticket.`,
				ephemeral: "true",
			});
		} else {
			console.log(channelID);
			delChannel.delete();
		}
	},
};

//channel name contains "ticket-" and parentId != 1051199232050212934 then
//
//parent ID 1112025532335407234
