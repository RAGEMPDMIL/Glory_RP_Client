$(document).ready(function () {
});

function setInfo(bank, playerMoney) {
    if(bank) {
        $('#credit-money').text('$' + String(bank).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }

    if (playerMoney) {
        $('#wallet-money').text('$' + String(playerMoney).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
}