
const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dark')
		.setDescription('darkness youtube link'),
	async execute(interaction) {
		await interaction.reply({ content: 'https://www.youtube.com/watch?v=x0ibnv35opk', ephemeral: true });
		await wait(40_000);
		await interaction.deleteReply();
	},
};