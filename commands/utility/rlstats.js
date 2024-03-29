const { SlashCommandBuilder } = require('discord.js');

// extraction from metadata
function extractPercetile(userData, gameMode = "Ranked Doubles 2v2") {
  const segments = userData['data']['segments']

  let currentSeason = userData['data']['metadata']['currentSeason']; // current season i.e. 28
  let percentile = -1;
  
  for (var segment of segments) {
    if (segment['type'] == 'playlist'){
      if(segment['attributes']['season'] == currentSeason)  {
        if(segment['metadata']['name'] == gameMode){
          percentile = segment['stats']['tier']['percentile'];
          return percentile;
        }
      }
    }
  }
  console.log('percentile:', percentile);
  return gameMode;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rl')
		.setDescription('rlstats'),
  // api call  
	async execute(interaction) {
    const apiUrl = 'https://api.tracker.gg/api/v2/rocket-league/standard/profile/epic/grayehz?'
    fetch(apiUrl, {
      "headers": {
        
      "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',

      }
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
      let percentile = extractPercetile(userData);
      console.log(percentile);
      console.log(typeof percentile);
      await interaction.reply({ content: percentile.toString() });
    })
    .catch(error => {
      console.error('Error:', error);
    });

	},
};