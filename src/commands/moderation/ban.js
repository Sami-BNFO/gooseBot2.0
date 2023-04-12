const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for banning the member")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

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
        content: "You can't ban yourself!",
        ephemeral: true,
      });
    }
    const member = interaction.guild.members.cache.get(target.id);
    if (!member.bannable) {
      return interaction.reply({
        content: "I can't ban that member!",
        ephemeral: true,
      });
    }

    await member.ban({
      deleteMessageSeconds: 60 * 60 * 24 * 7,
      reason: reason,
    });
    interaction.reply({
      content: `Banned ${target.tag}!`,
      ephemeral: true,
    });
  },
};
