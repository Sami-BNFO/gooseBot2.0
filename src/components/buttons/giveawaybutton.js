module.exports = {
	data: {
		name: 'giveawaybutton',
	},

	async execute(interaction, bot) {
		console.log('button was pressed');
		const giveaway = bot.giveaways[interaction.message.id]; //not interact.id
		console.log(giveaway);

		if (!giveaway) {
			return interaction.reply({
				content: 'This giveaway does not exist!',
				ephemeral: true,
			});
		}

		if (giveaway.entries.includes(interaction.user.id)) {
			return interaction.reply({
				content: 'You have already entered the giveaway!',
				ephemeral: true,
			});
		}

		giveaway.entries.push(interaction.user.id);
		giveaway.embed.setFields(
			{
				name: 'Giveaway Ends',
				value: `<t:${giveaway.futureTimestamp}:R>`,
				inline: true,
			},
			{
				name: 'Entries',
				value: `${giveaway.entries.length} entries`,
				inline: true,
			}
		);

		await interaction.update({
			embeds: [giveaway.embed],
			components: interaction.message.components,
		});

		await interaction.followUp({
			content: `You have entered the ${giveaway.prize} giveaway!`,
			ephemeral: true,
		});
	},
};
