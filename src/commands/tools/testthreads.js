const {
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");
        
module.exports = {
    data: new SlashCommandBuilder()
        .setName("testthread") 
        .setDescription("wadaha"),

    async execute(interaction, bot) {
        
        let lastMessage = await interaction.channel.messages.fetch({ limit: 1 });
		let previousMessage = lastMessage.last();  
        console.log(previousMessage.author.id)  
		await interaction.reply(`The last message was _"${previousMessage.content}"_`);

        while(true){
            if (previousMessage.author.id != bot.id) {
                interaction.reply(`The last message was _"${previousMessage.content}"_`);
            }
        }

    },
};
