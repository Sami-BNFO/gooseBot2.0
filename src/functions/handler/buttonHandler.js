const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

const ascii = require("ascii-table");
const tableC = new ascii().setHeading("Buttons", "Status");



module.exports = (bot) => {

    const buttonFolders = fs.readdirSync('./src/buttons');

    for (const folder of buttonFolders) {
        const buttonFiles = fs.readdirSync(`./src/buttons/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of buttonFiles) {
            const button = require(`../../buttons/${folder}/${file}`);
            
            tableC.addRow(`${button.data}`, "Loaded");
        }
    }

    console.log(tableC.toString());
    //when button is clicked
    bot.on('interactionCreate', async interaction => {
        if(interaction.isButton()) {
            const buttonID = bot.button.get(interaction.customId);
            if(!buttonID) return;

            try {
                await buttonID.execute(interaction);
                
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing the button script !', ephemeral: true});
            }
        } else {
            return;
        }
    })
}