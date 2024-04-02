const { SlashCommandBuilder } = require('discord.js');

// extraction from metadata
//target == gameMode = "Ranked Doubles 2v2"
function extractPercetile(userData, target = "Ranked Doubles 2v2") {
  const segments = userData['data']['segments']
  let currentSeason = userData['data']['metadata']['currentSeason']; // current season i.e. 28
  let percentile = -1;
  
  for (var segment of segments) {
    if (segment['type'] == 'playlist'){
      if(segment['attributes']['season'] == currentSeason)  {
        if(segment['metadata']['name'] == target){
          percentile = segment['stats']['tier']['percentile'];
          return percentile;
        }
      }
    }
  }
  console.log('percentile:', percentile);
  console.log('target:', target);
  return target;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rl')
		.setDescription('rlstats')
    .addStringOption(option => 
      option.setName('target')
        .setDescription('target gamemode to search')
        .setRequired(true)
        .addChoices(
					{ name: '2v2', value: 'Ranked Doubles 2v2' },
					{ name: '3v3', value: 'Ranked Standard 3v3' },
					{ name: '1v1', value: 'Ranked Duel 1v1' },
          )
    // .addStringOption(option => 
    //   option.setName('user')
    //     .setDescription('user to search')
    //     .setRequired(true)
    //   )
    ), 
        
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
      await interaction.reply({ content: percentile.toString(), });
    })
    .catch(error => {
      console.error('Error:', error);
    });

	},
};