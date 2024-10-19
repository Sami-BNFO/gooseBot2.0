const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveawayedit')
		.setDescription('Edit an existing giveaway.')
		.addStringOption((option) =>
			option
				.setName('giveawayid')
				.setDescription('The ID of the giveaway message to edit.')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('prize').setDescription('The new prize for the giveaway.')
		)
		.addIntegerOption((option) =>
			option
				.setName('duration')
				.setDescription('The new duration of the giveaway (minutes).')
		),

	async execute(interaction, bot) {
		const giveawayId = interaction.options.getString('giveawayid');
		const newPrize = interaction.options.getString('prize');
		const newDuration = interaction.options.getInteger('duration');
		const timestamp = Math.floor(Date.now() / 1000);
		const futureTimestamp = timestamp + newDuration * 60;

		if (!bot.giveaways || !bot.giveaways[giveawayId]) {
			return interaction.reply({
				content: 'Giveaway not found with the provided ID.',
				ephemeral: true,
			});
		}

		const giveaway = bot.giveaways[giveawayId];

		if (newPrize) {
			giveaway.prize = newPrize;
			giveaway.embed.setTitle(`Giveaway! ${newPrize}`);
		}

		if (newDuration) {
			const newFutureTimestamp =
				Math.floor(Date.now() / 1000) + newDuration * 60;
			giveaway.duration = newDuration;
			giveaway.futureTimestamp = newFutureTimestamp;

			giveaway.embed.spliceFields(0, 1, {
				name: 'Giveaway Ends',
				value: `<t:${newFutureTimestamp}:R>`,
				inline: true,
			});

			// Update the timeout
			clearTimeout(giveaway.timeout);
			giveaway.timeout = setTimeout(async () => {
				let winnerText = 'No Entry';
				if (giveaway && giveaway.entries.length > 0) {
					const winnerId =
						giveaway.entries[
							Math.floor(Math.random() * giveaway.entries.length)
						];
					winnerText = `Winner: <@${winnerId}>`;
				}

				const giveawayEndedEmbed = new EmbedBuilder()
					.setTitle(`Giveaway! ${giveaway.prize}`)
					.setAuthor({
						name: `Hosted by ${interaction.user.tag}`,
						iconURL: interaction.user.avatarURL(),
					})
					.setThumbnail(
						'https://miro.medium.com/v2/resize:fit:640/format:webp/1*PkQ11_mijBgGVH_8jcmAeQ.png'
					)
					.addFields(
						{
							name: 'Giveaway Ended',
							value: `<t:${giveaway.futureTimestamp}:R>`,
							inline: true,
						},
						{
							name: 'Entries',
							value: `${giveaway.entries.length} entries`,
							inline: true,
						}
					)
					.setDescription(winnerText)
					.setColor(0xe3c05f)
					.setTimestamp(Date.now())
					.setFooter({
						text: `This giveaway has ended! Make sure to look out for new ones. ❤`,
					});

				await interaction.channel.messages.fetch(giveawayId).then((message) => {
					message.edit({ embeds: [giveawayEndedEmbed], components: [] });
				});

				delete bot.giveaways[giveawayId];
			}, newDuration * 60 * 1000);
		}

		await interaction.reply({
			content: `Giveaway ${giveawayId} has been updated successfully.`,
			ephemeral: true,
		});

		await interaction.channel.messages.fetch(giveawayId).then((message) => {
			message.edit({ embeds: [giveaway.embed] });
		});
	},
};
