const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('starboard')
		.setDescription('Setup a starboard for your server!')
		.addStringOption((option) =>
			option
				.setName('channelid')
				.setDescription(
					'Where the messages are saved to, leave blank to create a new channel.'
				)
				.setRequired(true)
		)
		.addIntegerOption((option) =>
			option
				.setName('nreactions')
				.setDescription(
					'The amount of reactions does a message need to get to be saved'
				)
				.setRequired(true)
		),

	async execute(interaction, bot) {
		const prize = interaction.options.getString('channelid');
		const duration = interaction.options.getInteger('nreactions');
		const timestamp = Math.floor(Date.now() / 1000);
		const futureTimestamp = timestamp + duration * 60;

		const embed = new EmbedBuilder()
			.setTitle(`Giveaway! ${prize}`)
			.setAuthor({
				name: `Hosted by ${interaction.user.tag}`,
				iconURL: interaction.user.avatarURL(),
			})
			.setThumbnail(
				'https://miro.medium.com/v2/resize:fit:640/format:webp/1*PkQ11_mijBgGVH_8jcmAeQ.png'
			)
			.addFields(
				{
					name: 'Giveaway Ends',
					value: `<t:${futureTimestamp}:R>`,
					inline: true,
				},
				{
					name: 'Entries',
					value: `0 entries`,
					inline: true,
				}
			)
			.setColor(0xe3c05f)
			.setTimestamp(Date.now())
			.setFooter({
				text: `Make sure to thank ${interaction.user.tag} for hosting the giveaway ❤`,
			});

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('giveawaybutton')
				.setLabel('Enter Giveaway')
				.setStyle(ButtonStyle.Primary)
		);

		await interaction.deferReply();

		const message = await interaction.editReply({
			embeds: [embed],
			components: [row],
		});

		bot.giveaways = bot.giveaways || {};
		bot.giveaways[message.id] = {
			//message id instead if interaction id!!!
			embed,
			prize,
			duration,
			futureTimestamp,
			entries: [],
			messageId: message.id,
		};

		setTimeout(async () => {
			const giveaway = bot.giveaways[message.id];

			let winnerText = 'No Entry';
			if (giveaway && giveaway.entries.length > 0) {
				const winnerId =
					giveaway.entries[Math.floor(Math.random() * giveaway.entries.length)];
				winnerText = `Winner: <@${winnerId}>`;
			}

			const giveawayEndedEmbed = new EmbedBuilder()
				.setTitle(`Giveaway! ${prize}`)
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
						value: `<t:${futureTimestamp}:R>`,
						inline: true,
					},
					{
						name: 'Entries',
						value: `${giveaway ? giveaway.entries.length : 0} entries`,
						inline: true,
					}
				)
				.setDescription(winnerText)
				.setColor(0xe3c05f)
				.setTimestamp(Date.now())
				.setFooter({
					text: `This giveaway has ended! Make sure to look out for new ones. ❤`,
				});

			await interaction.editReply({
				embeds: [giveawayEndedEmbed],
				components: [],
			});

			delete bot.giveaways[message.id];
		}, duration * 60 * 1000);
	},
};
