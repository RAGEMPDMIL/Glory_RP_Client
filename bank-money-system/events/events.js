let moneyUI;
let moneyUIOpen = true;

// Triggers the UI
mp.events.add('client:moneySystem:moneyUIAvailable', (hour,minute, playerBank, playerMoney) => {
    moneyUIOpen = false;
    mp.keys.bind(0x45, true, function() {
        if(!moneyUIOpen) {
            moneyUIOpen = true;
            moneyUI = mp.browsers.new('package://DM_IL_Client/bank-money-system/ui/account-managment-ui.html');
            mp.events.callRemote('server:worldTime:getWorldTime', 'moneySystem');
            mp.events.callRemote('server:moneyBankSystem:getPlayerMoney');
            mp.players.local.freezePosition(true);
            mp.gui.chat.activate(false);
            mp.gui.chat.show(false);
            mp.gui.cursor.show(true, true);
            return;
        }
    });
});

mp.events.add('client:moneySystem:moneyUIUnavailable', () => {
    moneyUIOpen = true;
});

// Close the UI
mp.events.add('client:moneySystem:closeMoneyUI', () => {
    moneyUI.destroy();
    moneyUIOpen = false;
    mp.players.local.freezePosition(false);
    mp.gui.chat.activate(true);
    mp.gui.chat.show(true);
    mp.gui.cursor.show(false, false);
});

mp.events.add('client:moneyBankSystem:getWorldTime', (hour, minute) => {
    moneyUI.execute(`handleClock('${hour}', '${minute}');`);
});

mp.events.add('client:moneyBankSystem:getPlayerMoney', (playerBank, playerWallet) => {
    moneyUI.execute(`loadPlayerMoney('${playerBank}', '${playerWallet}');`);
});