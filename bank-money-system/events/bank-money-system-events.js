let moneyUI;
let moneyUIOpen = true;

// Triggers the UI
mp.events.add('client:moneySystem:moneyUIAvailable', () => {
    moneyUIOpen = false;
    mp.keys.bind(0x45, true, function() {
        if(!moneyUIOpen) {
            moneyUIOpen = true;
            moneyUI = mp.browsers.new('package://DM_IL_Client/bank-money-system/ui/account-managment-ui.html');
            mp.events.callRemote('server:moneyBankSystem:getPlayerMoney');
            mp.players.local.freezePosition(true);
            //mp.gui.chat.activate(false);
            //mp.gui.chat.show(false);
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

mp.events.add('client:moneyBankSystem:loadPlayer', (playerBank, playerWallet) => {
    moneyUI.execute(`loadPlayer('${mp.players.local.name}', '${playerBank}', '${playerWallet}');`);
});

mp.events.add('client:moneyBankSystem:deposit', (cash) => {
    mp.events.callRemote('server:moneyBankSystem:deposit', cash);
});

mp.events.add('client:moneyBankSystem:withdraw', (cash) => {
    mp.events.callRemote('server:moneyBankSystem:withdraw', cash);
});

mp.events.add('client:moneyBankSystem:transfer', (username ,cash) => {
    mp.events.callRemote('server:moneyBankSystem:transfer', username, cash);
});

mp.events.add('client:moneyBankSystem:stopLoading', (playerBank, playerWallet, errorMsg) => {
    mp.gui.chat.push(playerBank + ' ' + playerWallet + ' ' + errorMsg + ' ' + moneyUIOpen);
    if(moneyUIOpen) {
        moneyUI.execute(`stopLoading('${String(playerBank)}', '${String(playerWallet)}', '${errorMsg}');`);
    }
});