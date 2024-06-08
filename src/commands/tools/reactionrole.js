const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder, PermissionsBitField  } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionrole')
        .setDescription('click the button to get a super cool test role')
        .addRoleOption(option =>
            option.setName('role')
              .setDescription('The role to give to the user.')
              .setRequired(true)),


    async execute(interaction, bot) {
        const role = interaction.options.getRole('role');
        const button = new ButtonBuilder()
            .setCustomId(`assign-role-${role.id}`)
            .setLabel('Click me to get the @' + role.name + ' role' )
            .setStyle(ButtonStyle.Primary)

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(button)]
        });
    },
};
