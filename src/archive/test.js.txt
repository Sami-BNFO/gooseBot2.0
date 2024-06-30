const { SlashCommandBuilder } = require("discord.js");
const { HfAgent, LLMFromHub, defaultTools } = require('@huggingface/agents');
//const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("huggingface") 
        .setDescription("wadaha")
		.addStringOption((option) =>
			option
				.setName("prompt")
				.setDescription("pls work")
				.setRequired(true)
		),

    async execute(interaction, bot) {
		await interaction.deferReply();

		data = interaction.options.getString('prompt');

			//--
			headers = {
				'Authorization': 'Bearer ' + process.env.hfToken
			};
	
			payload = {
				inputs: {
					text: data,
				}
			};
			  
			response = await fetch('https://api-inference.huggingface.co/models/SamiA1234/GooseBot', {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: headers
			});
		
//payload is wrong
//response is wrong
		 

		try {
		//  generatedtext = 
		  console.log(response)
		  await interaction.editReply();
		} catch (error) {
		  console.log(error);
		  interaction.editReply('There was an error. Try again later!');
		}
    },
};

// const payload = {
//     inputs: {
//         text: message.content
//     }
// };

// const headers = {
//     'Authorization': 'Bearer ' + process.env.HUGGINFACE_TOKEN
// };

// const response = await fetch(API_URL, {
//     method: 'post',
//     body: JSON.stringify(payload),
//     headers: headers
// });
