//Purge X Messages
const {
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
	data: new SlashCommandBuilder()
		.setName("wiki") //names the command
		.setDescription("Gets a random Wikipedia page") //sets the description (bit under the name)
		.addStringOption(
			(
				option //adds a subcommand that asks for the question in the form of a string, while other varients exist for things like integers
			) =>
				option
					.setName("page") //names the subcommand
					.setDescription("What would you like to see?") //gives the subcommand a description
					.setRequired(false) //
		),

	async execute(interaction, bot) {
		const page = interaction.options.getString("page");
		let article;
		let word;
		if (!page) {
			link = String(
				"https://en.wikipedia.org/wiki/Special:Random"
			);
			word = "Random Page";
		} else {
			link = String(
				`https://en.wikipedia.org/wiki/${page}`
			);
			word = link
				.split("https://en.wikipedia.org/wiki/")
				.pop();
		}
		const Boticon =
			"https://cdn-icons-png.flaticon.com/512/2826/2826187.png";
		const embed = new EmbedBuilder()
			.setTitle("Wikipedia Feature!")
			.setAuthor({ name: "Goose", iconURL: `${Boticon}` })
			.setThumbnail(
				"https://en.wikipedia.org/static/images/icons/wikipedia.png"
			)
			.setDescription(
				"Click the button below to be redirected to a Wikipedia page!"
			)
			.setTimestamp(Date.now())
			.setFooter({
				text: ` \n Asked by ${interaction.user.tag} in ${interaction.guild.name}`,
			})
			.setColor(0xe3c05f);

		await interaction.reply({
			embeds: [embed],
			components: [
				new ActionRowBuilder().setComponents(
					new ButtonBuilder()
						.setLabel(word)
						.setStyle(ButtonStyle.Link)
						.setURL(link)
				),
			],
		});
	},
};

//Change the method to buttons
