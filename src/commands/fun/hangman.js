const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

const HANGMANPICS = [
	`
  +---+
  |   |
      |
      |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`,
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hangman')
		.setDescription('Hangman!')
		.addIntegerOption((option) =>
			option
				.setName('time')
				.setDescription('How long to run before revealing the answer (Minutes)')
				.setRequired(false)
		),

	async execute(interaction, bot) {
		const timeInMinutes = interaction.options.getInteger('time') || 1;

		const words = fs
			.readFileSync('./src/commands/fun/words.txt', 'utf8')
			.split('\n')
			.map((word) => word.trim());
		const word = words[Math.floor(Math.random() * words.length)];
		let guessedWord = '―'.repeat(word.length);
		console.log('Psst! The word is ' + word);
		await interaction.reply({
			content: `Let's play Hangman! Guess the word: ${guessedWord} (${guessedWord.length} Letters)\nWrite **END** to quit!`,
		});

		const channel = interaction.channel;

		let stage = 0;

		const collector = channel.createMessageCollector({
			time: timeInMinutes * 60000,
			filter: (msg) => msg.author.id !== bot.user.id,
		});

		collector.on('collect', (msg) => {
			const guess = msg.content.toLowerCase();
			if (guess === 'end') {
				msg.reply('Ending the game! The word was **' + word + '**');
				collector.stop();
			}

			if (guess.length === 1 && word.includes(guess)) {
				guessedWord = word
					.split('')
					.map((char, index) =>
						char === guess ? guess : guessedWord.charAt(index)
					)
					.join('');

				if (guessedWord === word) {
					msg.react('🎉');
					msg.reply(`Congratulations! You've guessed the word: **${word}**`);
					collector.stop();
				} else {
					msg.reply(`Good guess!\nCurrent progress: ${guessedWord}`);
				}
			} else if (guess.length === word.length && guess === word.toLowerCase()) {
				msg.react('🎉');
				msg.reply(`Congratulations! You've guessed the word: ${word}`);
				collector.stop();
			} else {
				stage++;
				if (stage >= HANGMANPICS.length) {
					msg.reply(`You lose! The word was **${word}**`);
					collector.stop();
				} else {
					msg.reply(
						`Nope, Guess again!\nCurrent progress: ${guessedWord}\n\`\`\`${HANGMANPICS[stage]}\`\`\``
					);
				}
			}
		});

		collector.on('end', (collected, reason) => {
			if (reason === 'time') {
				channel.send(`Time's up! The word was: ${word}`);
			}
		});
	},
};
