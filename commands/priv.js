module.exports= {
    name: 'checkpriv',
    description : "pp checker",
    execute(message, args) {
        
        if(message.member.roles.cache.has('847325724896526397')){
<<<<<<< HEAD
            message.channel.send('priv confirmed!');
=======
            message.channel.send('pp confirmed!');
>>>>>>> 269779dbe0a9e859d35eef8d00477cfed8f1911a
            
        } else {
            message.channel.send('priv detected.');
        }
            

    }
}
