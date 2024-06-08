module.exports = {
    data: {
        name: 'roletest'
    },
    async execute(interaction, bot) {
        const customId = interaction.customId;
        if (customId.startsWith('assign-role-')) {
            const roleId = customId.split('assign-role-')[1];
            console.log(roleId)
            const role = interaction.guild.roles.cache.get(roleId);

            if (role) {
                try {
                    if (interaction.member.roles.cache.has(roleId)){
                        await interaction.member.roles.remove(role);
                        await interaction.reply({
                            content: 'Role removed!',
                            ephemeral: true
                        });

                    }else{ //if they dont
                        await interaction.member.roles.add(role);
                        await interaction.reply({
                            content: 'Role added!',
                            ephemeral: true
                        });
                    }
                } catch (error) {

                    console.log('Error in roletest.js when clicking the button' + error);
                    await interaction.reply({
                        content: 'oops! something went wrong',
                        ephemeral: true
                    });
                }
            } else {
                await interaction.reply({
                    content: 'Role not found!',
                    ephemeral: true
                });
            }
        }
    }
}

