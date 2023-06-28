const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder from discord.js
const axios = require("axios");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("weather") //names the command
		.setDescription("Find the current weather of wherever")
		.addStringOption(
			(option) =>
				option
					.setName("location")
					.setDescription("where")
					.setRequired(true) //
		),
	async execute(interaction, bot) {
		location = interaction.options.getString("location");
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.weatherAPIKEY} `
			)
			.then((response) => {
				let temp = response.data.main.temp;
				let weatherDescription = response.data.weather[0];
				temp = ((temp - 32) * 5) / 9;

				interaction.reply({
					content: `TEMP: ${temp}\nDESC: ${weatherDescription}`,
				});
			})
			.catch((error) => {
				console.error(error);
				interaction.reply({
					content: "Something went wrong",
					ephemeral: true,
				});
			});
	},
};
