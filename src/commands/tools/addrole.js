const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Creates a new role with the specified name and color')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('The name of the role')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('color')
                .setDescription('The color of the role in hex format')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply('You do not have permission to manage roles.');
        }

        const roleName = interaction.options.getString('name');
        const roleColor = interaction.options.getString('color');

        if (!/^#[0-9A-F]{6}$/i.test(roleColor)) {
            return interaction.reply('Please provide a valid hex color code (e.g., #ff0000).');
        }

        await interaction.deferReply();

        try {
            const role = await interaction.guild.roles.create({
                name: roleName,
                color: roleColor,
                reason: `Role created by ${interaction.user.tag}`
            });
            const botHighestRole = interaction.guild.members.me.roles.highest.position;

            await role.setPosition(botHighestRole - 1);

            await interaction.member.roles.add(role);

            const embed = new EmbedBuilder()
                .setTitle('Role Created')
                .setDescription(`Role ${roleName} with color ${roleColor} has been created and assigned to you!`)
                .setColor(roleColor)
                .setTimestamp(Date.now())
                .setFooter({
                    text: `Created by ${interaction.user.tag} in ${interaction.guild.name}`,
                });


            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('There was an error creating the role. Please ensure the color is in hex format (e.g., #ff0000) and try again.');
        }
    },
};
