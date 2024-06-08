const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const ascii = require("ascii-table");

const tableC = new ascii().setHeading("Commands", "Status");

module.exports = (bot) => {
    bot.commandHandler = async () => {
        // Initialize commands and commandArray
        bot.commands = new Map();
        bot.commandArray = [];

        const commandFolders = fs.readdirSync(`./src/commands`);
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                if (command.data && command.data.name) {
                    bot.commands.set(command.data.name, command);
                    bot.commandArray.push(command.data.toJSON());
                    tableC.addRow(command.data.name, "Loaded");
                } else {
                    console.warn(`Command file ${file} is missing data or name property.`);
                }
            }
        }

        const rest = new REST({ version: "10" }).setToken(process.env.token);
        try {
            console.log("Loading Commands");

            await rest.put(Routes.applicationCommands(process.env.BOT_ID), {
                body: bot.commandArray,
            });

            console.log(tableC.toString());
        } catch (err) {
            console.error(err);
        }
    };
};
