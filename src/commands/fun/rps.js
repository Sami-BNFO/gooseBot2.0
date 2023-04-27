const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js"); //Loads and utilizes SlashCommandBuilder and EmbedBuilder FROM discord.js

//this creates the /ping command interface
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps") //names the command
    .setDescription("Paper shouldn't beat rock, but here we are.") //sets the description (bit under the name)
    .addStringOption((option) =>
      option
        .setName("weapon")
        .setDescription("I'd go for rock if I were you")
        .setRequired(true)
        .addChoices(
          { name: "🪨", value: "Rock" },
          { name: "📄", value: "Paper" },
          { name: "✂", value: "Scissors" },
        )
    ),

  async execute(interaction, bot) {
    const choice = interaction.options.getString("weapon");
    const gooseOptions = ["Rock", "Paper", "Scissors"];
    let wl
    let thumbnail
    let title
    const rThumb = "https://media.discordapp.net/attachments/1089187863339479101/1100848548809023607/IMG_1944-removebg-preview.png"
    const pThumb = "https://media.discordapp.net/attachments/1089187863339479101/1100836934454083584/IMG_1945.png?width=567&height=671"
    const sThumb = "https://cdn-icons-png.flaticon.com/512/4301/4301274.png"
    const tie = "https://hotsigns.net/assets/images/emogee%20175.png"
    gooseChoice = gooseOptions[Math.floor(Math.random() * gooseOptions.length)];
    if (choice === gooseChoice) {
      title = 'You tied!'
      wl = `You tied!\nYou both chose ${choice}.`
      thumbnail = tie
    } else if (choice === "Rock") { //Player Rock
      if (gooseChoice === "Paper") {
        title = "You lost!"
        wl = `You chose ${choice}, but Goose chose ${gooseChoice}...\nGoose Won!`
        thumbnail = rThumb
      } else {
        title = "You won!"
        wl = `You chose ${choice}, and Goose chose ${gooseChoice}...\nYou Won!`
        thumbnail = rThumb
      }
    } else if (choice === "Paper") { //Player Paper
      if (gooseChoice === "Scissors") {
        title = "You lost!"
        wl = `You chose ${choice}, but Goose chose ${gooseChoice}...\nGoose Won!`
        thumbnail = pThumb
      } else {
        title = "You won!"
        wl = `You chose ${choice}, and Goose chose ${gooseChoice}...\nYou Won!`
        thumbnail = pThumb
      }
    } else if (choice === "Scissors") {//Player Scissors
      if (gooseChoice === "Rock") {
        title = "You lost!"
        wl = `You chose ${choice}, but Goose chose ${gooseChoice}...\nGoose Won!`
        thumbnail = sThumb
      } else {
        title = "You won!"
        wl = `You chose ${choice}, and Goose chose ${gooseChoice}...\nYou Won!`
        thumbnail = sThumb
      }
    }
    //here
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setAuthor({
        name: "Goose",
        iconURL:
          "https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
      })
      .setThumbnail(thumbnail)
      .setDescription(
        `${wl}\nGG!`
      )
      .setColor(0xe3c05f)
      .setTimestamp(Date.now())
      .setFooter({
        text: ` \n Asked by ${interaction.user.tag} in ${interaction.guild.name}`,
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
