mp.events.add('playerReady', () => {
    mp.events.call('client:showLoginScreen');
});