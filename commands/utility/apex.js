const { SlashCommandBuilder } = require('discord.js');

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
		.setName('apex')
		.setDescription('apex stats')
    
        .addStringOption(option => 
            option
                .setName('user')
                .setDescription('user to search')
                .setRequired(true)
            ), 

  // api call  
	async execute(interaction) {
    const user = interaction.options.getString('user') ?? 'No user provided';
    const apiUrl = 'https://api.tracker.gg/api/v2/apex/standard/profile/origin/' + user
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