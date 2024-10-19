const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Leave the VC the user is currently in'),

	async execute(interaction) {
		const userVoiceChannel = interaction.member.voice.channel;
		if (!userVoiceChannel) {
			return interaction.reply({
				content: 'You need to join a voice channel first!',
				ephemeral: true,
			});
		}

		const connection = getVoiceConnection(userVoiceChannel.guild.id);
		connection.destroy();
		await interaction.reply({
			content: `Left ${userVoiceChannel.name}!`,
		});
	},
};
//joins your vc
//creates priv vc
//sends u there

// /join vc -> recognizes who typed it -> joins their VC
