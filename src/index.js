require("dotenv").config();

const {
	Client,
	Collection,
	GatewayIntentBits,
	Activity,
	ActivityType,
	Partials,
} = require("discord.js");
const fs = require("fs");
const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages,
	],
	partials: [Partials.Channel, Partials.Message],
});
bot.commands = new Collection();
bot.buttons = new Collection();
bot.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of functionFiles) {
		require(`./functions/${folder}/${file}`)(bot);
	}
}

bot.eventHandler();
bot.commandHandler();
bot.login(process.env.token);
