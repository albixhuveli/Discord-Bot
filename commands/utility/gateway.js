module.exports= {
    name: 'gate',
    description : "mod perms",
    execute(message, args) {
        
        if(message.member.roles.cache.has('847325724896526397')){
            message.channel.send('youre already in');
            
        } else {
            message.channel.send('you have been granted access.');
            message.member.roles.add('847325724896526397').catch(console.error);
        }
            
    }
}