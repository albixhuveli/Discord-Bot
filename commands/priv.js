module.exports= {
    name: 'priv',
    description : "priv checker",
    execute(message, args) {
        
        if(message.member.roles.cache.has('847325724896526397')){
            message.channel.send('priv confirmed!');
            
        } else {
            message.channel.send('priv detected.');
        }
            

    }
}
