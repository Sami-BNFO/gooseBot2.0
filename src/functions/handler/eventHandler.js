const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const ascii = require("ascii-table");
const tableB = new ascii().setHeading("Buttons", "Status");

module.exports = (bot) => {
	bot.eventHandler = async () => {
		const { buttons } = bot;
		const eventFolders = fs.readdirSync(`./src/events`);
		for (const folder of eventFolders) {
			const eventFiles = fs
				.readdirSync(`./src/events/${folder}`)
				.filter((file) => file.endsWith(".js"));
			switch (folder) {
				case "bot":
					for (const file of eventFiles) {
						const event = require(`../../events/${folder}/${file}`);
						if (event.once) {
							bot.once(event.name, (...args) =>
								event.execute(...args, bot)
							);
						} else {
							bot.on(event.name, (...args) =>
								event.execute(...args, bot)
							);
						}
					}
					break;
				case "buttons":
					console.log("Loading Buttons");
					for (const file of eventFiles) {
						const button = require(`../../events/${folder}/${file}`);
						buttons.set(button.data.name, button);
						tableB.addRow(`${button.data.name}`, "loaded");
					}
					break;

				default:
					break;
			}
		}
	};
};

// bot.on("messageCreate", async (message) => {
// 	if (message.guild == null) {
// 		console.log(
// 			`Dm received from\n${message.content}`
// 		);
// 		console.log(
// 			`Dm received\n${message.content}`
// 		);
// 		const channelID = bot.channels.cache.get(
// 			"1101883464481001472"
// 		);
// 		const DMcontent = new EmbedBuilder()
// 			.setTitle("NEW TICKET!")
// 			.setAuthor({
// 				name: "Goose",
// 				iconURL:
// 					"https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
// 			})
// 			.setThumbnail(
// 				"https://cdn-icons-png.flaticon.com/512/2067/2067046.png"
// 			)
// 			.setDescription(
// 				`\n\n**Content**:\n${message.content}`
// 			)
// 			.setColor("#e3c05f")
// 			.setTimestamp();
// 		channelID.send({ embeds: [DMcontent] });
// 	}
// });
