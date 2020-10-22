mp.events.add('client:playerBlip:hideSelfBlip', (blip) => {
    blip.setDisplay(0);
});