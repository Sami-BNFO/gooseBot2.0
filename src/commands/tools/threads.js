const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("threads") 
		.setDescription("Start a thread") 
        .addStringOption(
			(option) =>
				option
					.setName("reason")
					.setDescription("What is the reason for this thread")
					.setRequired(false) 
		),

	async execute(interaction, bot) {

        const ThreadName = interaction.user.username+"'s chat-"
        const ThreadReason = interaction.options.getString('reason') || "Hello!";
        
        var thread = await interaction.channel.threads.create({
            name: ThreadName,
            autoArchiveDuration: 60,
            reason: ThreadReason,
        });

        await thread.send({
			content: "Hello!"	
		});
        console.log(thread.id)




	},
};

//by next week
//1. /chat -> make a thread called 'username's chat-i'
//The bot will say hello initially and on reply