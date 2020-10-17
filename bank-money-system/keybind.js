mp.keys.bind(0x45, true, function() {
    mp.events.callRemote('server:player:bankact'); // Calling server event "keypress:F2"
});