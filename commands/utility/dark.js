
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dark')
		.setDescription('darkness youtube link'),
	async execute(interaction) {
		await interaction.reply('https://www.youtube.com/watch?v=x0ibnv35opk');
	},
};