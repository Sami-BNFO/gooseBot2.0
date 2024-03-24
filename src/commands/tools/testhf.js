const { SlashCommandBuilder } = require("discord.js");

//GETTING MODEL
const { HfInference } = require("@huggingface/inference");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("huggingface123") 
        .setDescription("wadaha")
		.addStringOption((option) =>
			option
				.setName("prompt")
				.setDescription("pls work")
				.setRequired(true)
		),

    async execute(interaction, bot) {
		//interaction.deferReply();
		data = interaction.options.getString('prompt');
        const HF_TOKEN = "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";
        const inference = new HfInference(HF_TOKEN);

		const payload = {
            inputs: {
                text: data.content
            }
        };
        
        const response = await inference.conversational({
                accessToken: HF_TOKEN,
                model: "SamiA1234/GooseBot",
                //inputs: payload,
                inputs: 'hi',
                //parameters: ,
        })
          
        const resp = await response.json();
        //console.log(generated_responses)
        //console.log(resp)
        
        //console.log(output)
        await interaction.reply({
            content: "hi",
        });

    },
};


//get model
//we need to input promp to model
//get result
//print result
//https://huggingface.co/learn/nlp-course/en/chapter4/2 this here basically
			

  