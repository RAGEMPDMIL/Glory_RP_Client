$(document).ready(function () {
    //loadMainPageData();
});

function onQuitUI() {
    mp.trigger('client:moneySystem:closeMoneyUI');
}

function handleClock(hour, minute) {
    let gameHour = hour;
    let gameMinute = minute;

    if(Number(gameMinute) < 10) {
        gameMinute = '0' + gameMinute;
    }

    if(Number(gameHour) < 10) {
        gameHour = '0' + gameHour;
    }
    $('#time-span').text(gameHour + ':' + gameMinute);

    setInterval(() => {
        if(Number(gameMinute) + 1 < 10) {
            gameMinute = '0' + String(Number(gameMinute) + 1);
        } else if(Number(gameMinute) + 1 < 60) {
            gameMinute = String(Number(gameMinute) + 1);
        } else {
            gameMinute = '00';
        }

        if(Number(gameMinute) + 1 === 60 && Number(gameHour) + 1 < 10) {
            gameHour = '0' + String(Number(gameHour) + 1);
        } else if(Number(gameMinute) + 1 === 60 && Number(gameHour) + 1 < 24) {
            gameHour = String(Number(gameHour) + 1);
        } else if(Number(gameMinute) + 1 === 60 && Number(gameHour) + 1 === 24){
            gameHour = '00';
        }

        $('#time-span').text(gameHour + ':' + gameMinute);
    }, 2000);
}

function loadPlayerMoney(playerBank, playerMoney) {
    $('#account-balance-span').text('Account balance: $' + String(playerBank).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#player-money-span').text('Available deposit: $' + String(playerMoney).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}