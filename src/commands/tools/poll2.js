const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, APIEmbedField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll2")
        .setDescription("updated poll feature!")
        .addStringOption((option) =>
            option
                .setName("question")
                .setDescription("Set the question for the vote")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("options")
                .setDescription("Set the available answers, separated by a comma (Defaults to Yes/No)")
                .setRequired(false)
        ),

    async execute(interaction) {

        const question = interaction.options.getString('question');
        const optionsString = interaction.options.getString('options') || 'Yes,No';
        const options = optionsString.split(",").map((option) => option.trim());
        const buttons = [];
        const row = new ActionRowBuilder();

        for (const i in options) {
            buttons.push(
                new ButtonBuilder()
                    .setCustomId(`B-${i}`)
                    .setLabel(options[i])
                    .setStyle(ButtonStyle.Primary)
            );
        }

        row.addComponents(buttons); 

        const embed = new EmbedBuilder()
            .setTitle(question)
            .setAuthor({
                name: interaction.user.username + ' asked the question',
                iconURL:
                    "https://cdn-icons-png.flaticon.com/512/179/179386.png",
            })
            .setDescription('Choose your vote with the buttons below!');

        options.forEach(option => {
            embed.addFields({ name: option, value: 'Votes: ' });
        });

        await interaction.reply({
            embeds: [embed],
            components: [row],
        });
    },
};
