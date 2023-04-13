const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("serverinfo") //names the command
		.setDescription(
			"Displays all the information about this server"
		), //sets the description (bit under the name)

	async execute(interaction, bot) {
		const members = interaction.guild.memberCount;
		const DateCreated =
			interaction.guild.createdAt.toDateString();
		const serverName = interaction.guild.name;
		const owner = await interaction.guild.fetchOwner();
		const Servericon = interaction.guild.iconURL();
		const Boticon =
			"https://cdn-icons-png.flaticon.com/512/2826/2826187.png";
		const guildID = interaction.guild.id;

		const embed = new EmbedBuilder()
			.setTitle(`${serverName} Information`)
			.setAuthor({ name: "Goose", iconURL: `${Boticon}` })
			.setThumbnail(`${Servericon}`)
			.addFields(
				{ name: "Server Owner", value: `${owner}` },
				{
					name: "Server Name",
					value: `${serverName}`,
					inline: true,
				},
				{
					name: "Members",
					value: `${members}`,
					inline: true,
				},
				{
					name: "Date Created",
					value: `${DateCreated}`,
					inline: true,
				},
				{
					name: "Server ID",
					value: `${guildID}`,
					inline: true,
				}
			)
			.setTimestamp(Date.now())
			.setFooter({
				text: ` \n Asked by ${interaction.user.tag} in ${serverName}`,
			})
			.setColor(0xe3c05f);
		console.log(`Server Icon: ${Servericon}`);
		console.log(`Guild ID: ${guildID}`);
		await interaction.reply({
			embeds: [embed],
		});
	},
};
//`
