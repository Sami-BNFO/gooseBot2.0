module.exports = {
    data: {
        name: 'template'
    },
    async execute(interaction, bot) {
        await interaction.reply({
            content: 'hello'
        });
    }
}