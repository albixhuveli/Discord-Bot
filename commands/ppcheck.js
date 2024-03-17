module.exports= {
    name: 'checkpriv',
    description : "pp checker",
    execute(message, args) {
        
        if(message.member.roles.cache.has('847325724896526397')){
            message.channel.send('priv confirmed!');
            
        } else {
            message.channel.send('priv detected.');
        }
            

    }
}