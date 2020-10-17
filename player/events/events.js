mp.events.add('client:player:loadInterior', (x,y,z,ipl) => {
    var interior = mp.game.interior.getInteriorAtCoords(x, y, z);
    mp.game.streaming.requestIpl(ipl);
    mp.game.interior.refreshInterior(interior);
  });
