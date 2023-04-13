const { ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	async execute(bot) {
		console.log(`${bot.user.tag} online`);
		bot.user.setPresence({
			activities: [
				{
					name: `Untitled Goose Game`,
					type: ActivityType.Playing,
				},
			],
			status: "online",
		});
	},
};
