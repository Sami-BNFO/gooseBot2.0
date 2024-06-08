const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const ascii = require("ascii-table");

module.exports = (bot) => {
	bot.eventHandler = async () => {
		const { buttons } = bot;
		const eventFolders = fs.readdirSync(`./src/events`);
		for (const folder of eventFolders) {
			const eventFiles = fs
				.readdirSync(`./src/events/${folder}`)
				.filter((file) => file.endsWith(".js"));
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
		}
	};
};
