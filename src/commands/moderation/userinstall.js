module.exports = {
	data: {
		name: 'userinstalll',
		description: 'user install command test!',
		integration_types: [1],
		contexts: [0, 1, 2],
	},
	async execute(interaction) {
		interaction.reply({ content: 'works' });
	},
};
