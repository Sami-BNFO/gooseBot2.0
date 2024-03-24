const {
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");
const {HfAgent, LLMFromHub, defaultTools} = require ('@huggingface/agents');
        
module.exports = {
    data: new SlashCommandBuilder()
        .setName("testhf") 
        .setDescription("wadaha"),

    async execute(interaction, bot) {
        const HF_TOKEN = process.env.hfToken;
        const agent = new HfAgent(
            HF_TOKEN,
            LLMFromHub(HF_TOKEN),
            [...defaultTools]
          );
          console.log('running');
          const messages = await agent.run("hello")
          console.log(messages); 
    },
};
//1. need Api key
//2. 

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