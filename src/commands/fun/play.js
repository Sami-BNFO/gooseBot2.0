const { SlashCommandBuilder } = require('discord.js');
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	AudioPlayerStatus,
} = require('@discordjs/voice');

const ytdlDiscord = require('ytdl-core-discord');
const ytdl = require('ytdl-core');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a specific very special song. . .'),

	async execute(interaction) {
		const voiceChannel = interaction.member.voice.channel;
		const APIkey = process.env.YoutubeAPIKEY;

		if (!voiceChannel) {
			return interaction.reply('You need to be in a VC dummy');
		}

		const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: interaction.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		});

		const player = createAudioPlayer();
		connection.subscribe(player);

		const videoURL = 'https://www.youtube.com/watch?v=bBQA7yy7EBU';
		const songInfo = await ytdl.getBasicInfo(videoURL);

		const song = {
			title: songInfo.videoDetails.title,
			url: songInfo.videoDetails.video_url,
			duration: songInfo.videoDetails.lengthSeconds,
		};
		console.log(song.title, song.url, song.duration);
		const stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
		const resource = createAudioResource(stream);

		player.play(resource);

		player.on(AudioPlayerStatus.Playing, () => {
			console.log('The audio is playing');
		});

		player.on(AudioPlayerStatus.Idle, () => {
			console.log('The audio is no longer playing');
			connection.destroy();
		});

		await interaction.reply(`Now playing: ${videoURL}`);
	},
};
