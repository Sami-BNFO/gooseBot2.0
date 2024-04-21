const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

const button = new ButtonBuilder()
	.setCustomId('disabled')
	.setLabel('Clickme?')
	.setStyle(ButtonStyle.Primary)
	.setDisabled(true);
