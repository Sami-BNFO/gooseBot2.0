const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gtn")
        .setDescription("guess the number")
        .addNumberOption(
            (option) =>
                option
                    .setName("max")
                    .setDescription("Highest the number can be (default 100)")
                    .setRequired(false)
        )
		.addIntegerOption(
            (option) =>
                option
                    .setName("time")
                    .setDescription("How long to run before revealing the answer (Minutes)")
                    .setRequired(false)
        ),

    async execute(interaction, bot) {
        const max = interaction.options.getNumber('max') || 100;
        if (max < 2){
            await interaction.reply({
                content: 'Max must be a number greater than 1',
                ephemeral: true
            })
        }else{
            const answer = Math.floor(Math.random() * max) + 1;
            const time = interaction.options.getInteger('time') || 1;
            const channel = interaction.channel;
            console.log('Psst! The answer is ' + answer)
            await interaction.reply({
                content: 'Guess the number! 1-' +max
            });

            const collector = channel.createMessageCollector({
                time: time*60000,
                filter: (msg) => msg.author.id !== bot.user.id,
            });
            collector.on('collect', (msg) => {
                const guess = parseInt(msg.content);	
                
                if (!isNaN(guess)) {
                    if (guess === answer) {
                        msg.react('🎉');
                        msg.reply("Congratulations! <@" + interaction.user + "> guessed the number!");
                        collector.stop();
                    }
                }
            });
    
            collector.on('end', (reason) => {
                if (reason === 'time') {
                    channel.send("Time's up! The correct number was " + answer);
                }
            });
        }
        
    },
};
