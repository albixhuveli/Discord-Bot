const { SlashCommandBuilder } = require('discord.js');
const { ytapi } = require('./config.json');

// extraction from metadata
function extractPercetile(userData, ) {
  const segments = userData['data']['segments']
  let percentile = -1;

  for (var segment of segments) {
    if (segment['type'] == 'overview'){
        if(segment['stats']['rankScore']['percentile']){
          percentile = segment['stats']['rankScore']['percentile'];
          return percentile;
      }
    }
  }
  console.log('percentile:', percentile);
  return;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('youtube')
		.setDescription('youtube video loader')
    
        .addStringOption(option => 
            option
                .setName('search')
                .setDescription('video to search')
                .setRequired(true)
            ), 

  // api call  
	async execute(interaction) {
    const search = interaction.options.getString('search') ?? 'No user provided';
    const apiUrl = '' + search
    fetch(apiUrl, {
      "headers": {
      "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',}
    })

    .then(response => {
      console.log("r", response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(async userData => {
      // Process the retrieved user data
      let percentile = extractPercetile(userData,);
      console.log(percentile);
      console.log(typeof percentile);
      await interaction.reply({ content: percentile.toString(), });
    })
    .catch(error => {
      console.error('Error:', error);
    });
    },
};