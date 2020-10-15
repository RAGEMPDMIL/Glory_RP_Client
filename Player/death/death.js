mp.events.add("playerDeath", (player) => {
    mp.trigger('client:player:playerdeath',player);
});