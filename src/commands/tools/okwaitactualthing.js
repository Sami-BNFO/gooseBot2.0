const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("huggingface12345") 
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

        headers = {
            'Authorization': 'Bearer ' + HF_TOKEN
        };

        let botResponse = '';
        
        try {
            
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
        } catch (error) {
            console.error("HF404");
            botResponse = "Oops";
        }

        await interaction.editReply(botResponse);
    },
};
