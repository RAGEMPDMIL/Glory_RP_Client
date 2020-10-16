const gunStoreUI = require('../../ui/gun_store_ui/gun-store-ui');

mp.events.add('client:commands:getWeapon', () => {
    gunStoreUI.handleGunStoreUI();
});