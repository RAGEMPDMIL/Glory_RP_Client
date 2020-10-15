mp.events.add('client:player:playerdeath',player=>{
    mp.events.callRemote('Server:player:deathHandler',player);
})
