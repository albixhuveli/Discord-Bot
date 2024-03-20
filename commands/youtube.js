module.exports= {
    name: 'dark',
    description : "youtube link",
    execute(message, args) {
        
        if(message.member.roles.cache.has('847325724896526397')){
            message.channel.send('https://www.youtube.com/watch?v=x0ibnv35opk');
            
        } else {
            message.channel.send('no darkness for you :-)');
        }
        

    }
}