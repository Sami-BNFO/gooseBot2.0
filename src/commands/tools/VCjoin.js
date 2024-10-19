const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join the VC the user is currently in'),

	async execute(interaction) {
		//member.voiceChannel
		const userVoiceChannel = interaction.member.voice.channel;
		if (!userVoiceChannel) {
			return interaction.reply({
				content: 'You need to join a voice channel first!',
				ephemeral: true,
			});
		}

		const connection = joinVoiceChannel({
			channelId: userVoiceChannel.id,
			guildId: userVoiceChannel.guild.id,
			adapterCreator: userVoiceChannel.guild.voiceAdapterCreator,
		});

		await interaction.reply({
			content: `Joined ${userVoiceChannel.name}!`,
		});
	},
};
//joins your vc
//creates priv vc
//sends u there

// /join vc -> recognizes who typed it -> joins their VC
