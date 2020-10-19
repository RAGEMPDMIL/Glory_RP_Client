const peds = {
    Shoopkeeper1: {
        model: mp.game.joaat('u_m_y_pogo_01'),
        position: {
            x: 253.7128,
            y: -51.00306,
            z: 69.9410
        },
        heading: 70,
        dimension: mp.players.local.dimension
    }
};

Object.keys(peds).forEach((v) => {
    mp.peds.new(peds[v].model, new mp.Vector3(peds[v].x, peds[v].y, peds[v].z), peds[v].heading, peds[v].dimension);
});
