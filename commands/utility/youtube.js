const { SlashCommandBuilder } = require('discord.js');
const { ytapi } = require('../../config.json');
const FuzzySearch = require('fuzzy-search');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('youtube')
		.setDescription('youtube video loader')
    
        .addStringOption(option => 
            option
                .setName('search')
                .setDescription('video to search or url')
                .setRequired(true)
        ), 

  // api call  
	async execute(interaction) {
    const search = interaction.options.getString('search') ?? 'No user provided';
    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (urlPattern.test(search)) {
			// Handle the URL here. For example, you could validate the URL and then send it back to the user.
			await interaction.reply(`You provided this URL: ${search}`);
		} else {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&key=` + ytapi);
      const videos = response.data.items.map(item => ({ title: item.snippet.title, url: `https://www.youtube.com/watch?v=${item.id.videoId}` }));
      const searcher = new FuzzySearch(videos, ['title'], { caseSensitive: false });
      const result = searcher.search(search);

      if (result.length > 0) {
        await interaction.reply(`Top result: ${result[0].title} - ${result[0].url}`);
      } else {
        await interaction.reply('No results found');
      }
    }
  },
}