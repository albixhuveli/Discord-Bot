
const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addStringOption(option =>
			option
				.setName('test')
				.setDescription('target word')
				.setRequired(true)
				),

	async execute(interaction) {
		const test = interaction.options.getString('test') ?? 'No target provided';
		await interaction.reply({ content: 'pong! ' + test, ephemeral: true });
		await wait(30_000);
		await interaction.deleteReply();
	},
};

