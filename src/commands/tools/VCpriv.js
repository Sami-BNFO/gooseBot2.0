const {
	SlashCommandBuilder,
	PermissionsBitField,
	ChannelType,
} = require('discord.js');
const {
	joinVoiceChannel,
	VoiceConnectionStatus,
	VoiceConnection,
} = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vcpriv')
		.setDescription('Create a private VC and move the user there'),

	async execute(interaction, bot) {
		const userVoiceChannel = interaction.member.voice.channel;
		if (!userVoiceChannel) {
			return interaction.reply({
				content: `You must be in #${interaction.guild.channels.cache.get(
					process.env.PrivateVCChannelID
				)} to create a private VC!`,
				ephemeral: true,
			});
		}
		const VCCreateChannel = interaction.guild.channels.cache.get(
			process.env.PrivateVCChannelID
		);

		if (userVoiceChannel.id === VCCreateChannel.id) {
			const privateVC = await interaction.guild.channels.create({
				name: `private-${interaction.user.username}`,
				type: ChannelType.GuildVoice,
				permissionOverwrites: [
					{
						id: interaction.guild.roles.everyone,
						deny: [PermissionsBitField.Flags.ViewChannel],
					},
					{
						id: interaction.user.id,
						allow: [
							PermissionsBitField.Flags.ViewChannel,
							PermissionsBitField.Flags.Speak,
							PermissionsBitField.Flags.Connect,
							PermissionsBitField.Flags.ManageChannels,
						],
					},
				],
			});

			if (process.env.PrivateVCParentChannelID) {
				await privateVC.setParent(process.env.PrivateVCParentChannelID, {
					lockPermissions: false,
				});
			}

			const connection = joinVoiceChannel({
				channelId: privateVC.id,
				guildId: privateVC.guild.id,
				adapterCreator: privateVC.guild.voiceAdapterCreator,
			});

			const {
				createAudioPlayer,
				NoSubscriberBehavior,
				createAudioResource,
			} = require('@discordjs/voice');

			const player = createAudioPlayer({
				behaviors: {
					noSubscriber: NoSubscriberBehavior.Pause,
				},
			});

			const resource = createAudioResource('src/sounds/pluh.mp3');
			player.play(resource);

			connection.subscribe(player);

			bot.on('voiceStateUpdate', (oldState, newState) => {
				if (oldState.channelId && !newState.channelId) {
					console.log('Someone left');
					if (privateVC.members) {
						privateVC.delete();
					}
				}
			});

			await interaction.member.voice.setChannel(privateVC);

			await interaction.reply({
				content: `Private voice channel created and you have been moved to ${privateVC}!`,
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: `You must be in #${VCCreateChannel} to create a private VC!`,
				ephemeral: true,
			});
		}
	},
};
