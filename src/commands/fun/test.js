const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("testpop") //names the command
		.setDescription("testing for .pop"), //sets the description (bit under the name)

	async execute(interaction, bot) {
		// const user = interaction.user.tag;
		// const both = user.split("#");
		// const Name = both[0];
		// console.log(Name);
		const Name = interaction.user.tag.split("#")[0];
		console.log(Name);
	},
};
