const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for kicking the member")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction, bot) {
    const target = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") || "No reason provided";

    if (target.id === bot.user.id) {
      return interaction.reply({
        content: "You can't ban me!",
        ephemeral: true,
      });
    }

    if (target.id === interaction.user.id) {
      return interaction.reply({
        content: "You can't kick yourself!",
        ephemeral: true,
      });
    }

    const member = interaction.guild.members.cache.get(target.id);
    if (!member.kickable) {
      return interaction.reply({
        content: "I can't kick that member!",
        ephemeral: true,
      });
    }

    await member.kick(reason);
    interaction.reply({ content: `Kicked ${target.tag}!`, ephemeral: true });
  },
};
