const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("rps") //names the command
		.setDescription("paper shouldn't beat rock, but here we are.") //sets the description (bit under the name)
    .addStringOption((option) =>
      option
        .setName("weapon")
        .setDescription("I'd go for rock if I were you")
        .setRequired(true)
        .addChoices(
          { name: "🪨", value: "Rock" },
          { name: "📄", value: "Paper" },
          { name: "✂️", value: "Scissors" },
        )
    ),

  async execute(interaction, bot) {
    const choice = interaction.options.getString("weapon");
    const gooseOptions = ["Rock!", "Paper!", "Scissors!"];
    gooseChoice = gooseOptions[Math.floor(Math.random() * gooseOptions.length)];
    
		const embed = new EmbedBuilder()
			.setTitle(`You chose ${choice}, and goose chose... ${gooseChoice}!`)
			.setAuthor({
				name: "Goose",
				iconURL:
					"https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
			})
			.setThumbnail(
				"https://cdn-icons-png.flaticon.com/512/5604/5604391.png"
			)
			.setDescription(
				`won the game!`
			)
			.setColor(0xe3c05f)
			.setTimestamp(Date.now())
			.setFooter({
				text: ` \n Asked by ${interaction.user.tag} in ${interaction.guild.name}`,
			});

		await interaction.reply({
			embeds: [embed],
		});
	},
};
