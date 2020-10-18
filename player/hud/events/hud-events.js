let moneyHud;

// Loads all player huds
mp.events.add('client:playerHud:loadHud', () => {
    moneyHud = mp.browsers.new('package://DM_IL_Client/player/hud/ui/money-info/money-info-ui.html');
});

// Sets all data to player huds when login
mp.events.add('client:playerHud:getHudData', (data) => {
    moneyHud.execute(`setInfo('${data[1]}', '${data[0]}');`);
});

// Money HUD
mp.events.add('client:playerHud:setMoneyInfo', (bank, playerMoney) => {
    moneyHud.execute(`setInfo('${bank}', '${playerMoney}');`);
});