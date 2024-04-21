const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chat") 
        .setDescription("dyinggg")
        .addStringOption((option) =>
            option
                .setName("prompt")
                .setDescription("pls work")
                .setRequired(true)
        ),

    async execute(interaction, bot) {
        await interaction.deferReply();
        const url = process.env.hfAPIURL;
        const prompt = interaction.options.getString('prompt');
        const HF_TOKEN = process.env.hfToken;

        const payload = {
            inputs: prompt
        };

        const headers = {
            'Authorization': 'Bearer ' + HF_TOKEN
        };
        

        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify(payload),
            headers: headers
        });
        const data = await response.json();
        console.log(data)
        let botResponse = '';

        if (data.hasOwnProperty('generated_text')) {
            botResponse = data.generated_text;
            console.log('Generated Text:' + botResponse)
        } else if (data.hasOwnProperty('error')) {
            botResponse = data.error;
            console.log('Error' + botResponse)
        }

            /*
            const response = await fetch (url, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: headers
            });
            const data = await response.json();
            if (data.hasOwnProperty('generated_text')) {
                botResponse = data.generated_text;
                console.log('hello??')
            } else if (data.hasOwnProperty('error')) {
                botResponse = "Error: " + data.error;
            } else { botResponse = 'wth'}
            */

        //await interaction.editReply(botResponse);
    },
};
//need tokenizer.config
