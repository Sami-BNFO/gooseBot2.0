const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("hello") //names the command
		.setDescription("A"), //sets the description (bit under the name)

	async execute(interaction, bot) {
		const embed = new EmbedBuilder()
			.setTitle("test")
			.setDescription("test");
		const message = await interaction.reply({
			embeds: [embed],
			fetchReply: true,
		});
		//await message.react("<:yes:1122176407729082449>");
		//await message.react("<:no:1122176379409141820>");
	},
};
