mp.events.add('playerReady', () => {
    mp.events.call('client:auth:userConnected');
    mp.players.local.dimension = 1;
});