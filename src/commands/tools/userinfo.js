const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("userinfo") //names the command
		.setDescription(
			"Displays all the information about a user"
		)
		.addUserOption((option) =>
			option
				.setName("name")
				.setDescription("Lookup who?")
				.setRequired(true)
		),

	async execute(interaction, bot) {
		const serverName = interaction.guild.name;
		const user = interaction.options.getUser("name");
		const Boticon =
			"https://cdn-icons-png.flaticon.com/512/2826/2826187.png";
		const Usericon = user.avatarURL();
		const embed = new EmbedBuilder()
			.setTitle(`**__User Info__**\n${user.tag}`)
			.setAuthor({ name: "Goose", iconURL: `${Boticon}` })
			.setThumbnail(Usericon)
			.addFields(
				{ name: "Account Name:", value: `${user}` },
				{ name: "User ID:", value: `${user.id}` },
				{
					name: "Account Created:",
					value: `<t:${parseInt(
						user.createdTimestamp / 1000
					)}:R>`,
				}
			)
			.setTimestamp(Date.now())
			.setFooter({
				text: ` \n Asked by ${interaction.user.tag} in ${serverName}`,
			})
			.setColor(0xe3c05f);
		await interaction.reply({
			embeds: [embed],
		});
	},
};
//`
