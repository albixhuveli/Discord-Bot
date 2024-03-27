
const { SlashCommandBuilder } = require('discord.js');

function extractPercetile(userData, gameMode = "Ranked Doubles 2v2") {
  const segments = userData['data']['segments']

  let currentSeason = 28;
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
    
	async execute(interaction) {
        const apiUrl = 'https://api.tracker.gg/api/v2/rocket-league/standard/profile/epic/grayehz?'
        fetch(apiUrl, {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "if-modified-since": "Wed, 27 Mar 2024 00:22:33 GMT",
    "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
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
          await interaction.reply(percentile.toString());
        })
        .catch(error => {
          console.error('Error:', error);
        });
	},
};