const { ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	async execute(bot) {
		console.log(`${bot.user.tag} online`);
		bot.user.setPresence({
			activities: [
				{
					name: `your every move`,
					type: ActivityType.Watching,
				},
			],
			status: "online",
		});
	},
};
