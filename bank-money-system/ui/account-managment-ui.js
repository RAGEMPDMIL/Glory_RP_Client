let bankMoney, walletMoney;

$(document).ready(function () {
    $('#waiting').show();
    $('body').addClass("active");

    $('.btn-sign-out').click(function () {
        $('#general, #waiting, #transferUI, #withdrawUI, #depositUI, #topbar, #spinner, #error').hide();
        $('body').removeClass("active");
        mp.trigger('client:moneySystem:closeMoneyUI');
    });

    $('.back').click(function () {
        $('#depositUI, #withdrawUI, #transferUI, #spinner, #error').hide();
        $('#general').show();

        $("#transfer-error").css('color', 'unset');
        $("#transfer-error").text('How much do you want to transfer?');
        $("#username-error").css('color', 'unset');
        $('#username-error').text('Who would you like to transfer to?');

        $("#deposit-error").css('color', 'unset');
        $("#deposit-error").text('How much do you want to deposit?');

        $("#withdraw-error").css('color', 'unset');
        $("#withdraw-error").text('How much do you want to transfer?');
    });

    $('#deposit').click(function () {
        $('#general').hide();
        $('#depositUI').show();
    });

    $('#withdraw').click(function () {
        $('#general').hide();
        $('#withdrawUI').show();
    });

    $('#transfer').click(function () {
        $('#general').hide();
        $('#transferUI').show();
    });

    // $('#esx_invest').click(function(){
    // });

    $('#fingerprint-content').click(function () {
        $('.fingerprint-active, .fingerprint-bar').addClass("active");
        setTimeout(function () {
            $('#general').css('display', 'block');
            $('#topbar').css('display', 'flex');
            $('#waiting').css('display', 'none');
            $('.fingerprint-active, .fingerprint-bar').removeClass("active");
        }, 1400);
    });

    $("#deposit1").submit(function (e) {
        e.preventDefault(); // Prevent form from submitting
        const amountVal = Number($("#amount").val());
        if (Number(walletMoney) < amountVal) {
            $("#deposit-error").css('color', 'red');
            $("#deposit-error").text('You can\'t deposit more then you have in your wallet');
            return;
        } else if (amountVal <= 0) {
            $("#deposit-error").css('color', 'red');
            $("#deposit-error").text('Please enter a valid value');
            return;
        } else {
            mp.trigger('client:moneyBankSystem:deposit', amountVal);
            $('#depositUI').hide();
            $('#spinner').show();
            $("#deposit-error").css('color', 'unset');
            $("#deposit-error").text('How much do you want to deposit?');
            bankMoney = String(Number(bankMoney) + amountVal);
            $('.curbalance').text(bankMoney);
            $("#amount").val('');
        }
    });

    $("#transfer1").submit(function (e) {
        e.preventDefault(); // Prevent form from submitting
        const amountVal = Number($("#amountt").val());
        if (Number(bankMoney) < amountVal) {
            $("#transfer-error").css('color', 'red');
            $("#transfer-error").text('You can\'t transfer more then you have in your bank');
            return;
        } else if ($('#to').val() === '') {
            $("#username-error").css('color', 'red');
            $('#username-error').text('You must specify a user to transfer to');
            return;
        } else if (amountVal <= 0) {
            $("#transfer-error").css('color', 'red');
            $("#transfer-error").text('Please enter a valid value');
            return;
        } else {
            mp.trigger('client:moneyBankSystem:transfer', $('#to').val(), Number($("#amountt").val()));
            $('#transferUI').hide();
            $('#spinner').show();
            $("#transfer-error").css('color', 'unset');
            $("#transfer-error").text('How much do you want to transfer?');
            $("#username-error").css('color', 'unset');
            $('#username-error').text('Who would you like to transfer to?');
            bankMoney = String(Number(bankMoney) - amountVal);
            $('.curbalance').text(bankMoney);
            $("#amountt").val('');
            $('#to').val('');
        }
    });

    $("#withdraw1").submit(function (e) {
        e.preventDefault();
        const amountVal = Number($("#amountw").val());
        if (Number(bankMoney) < amountVal) {
            $("#withdraw-error").css('color', 'red');
            $("#withdraw-error").text('You can\'t withdraw more then you have in your bank');
            return;
        } else if (amountVal <= 0) {
            $("#withdraw-error").css('color', 'red');
            $("#withdraw-error").text('Please enter a valid value');
            return;
        } else {
            mp.trigger('client:moneyBankSystem:withdraw', Number($("#amountw").val()));
            $('#withdrawUI').hide();
            $('#spinner').show();
            $("#withdraw-error").css('color', 'unset');
            $("#withdraw-error").text('How much do you want to transfer?');
            bankMoney = String(Number(bankMoney) - amountVal);
            $('.curbalance').text(bankMoney);
            $("#amountw").val('');
        }
    });
});

document.onkeyup = function (data) {
    if (data.key == 'Escape') {
        mp.trigger('client:moneySystem:closeMoneyUI');
        $('#general, #waiting, #transferUI, #withdrawUI, #depositUI, #topbar').hide();
        $('body').removeClass("active");
    }
};

function loadPlayer(username, playerBank, playerWallet) {
    bankMoney = playerBank;
    walletMoney = playerWallet;
    $('.username1').text(username);
    $('.curbalance').text(playerBank.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

function stopLoading(playerBank, playerWallet, errorMsg) {
    console.log(playerBank, playerWallet, errorMsg);
    $('#spinner').hide();
    $('.curbalance').text(playerBank.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    bankMoney = String(playerBank);
    walletMoney = String(playerWallet);
    if(String(errorMsg) === 'undefined') {
        $('#general').show();
        return;
    } else {
        $('#action-error').text(String(errorMsg));
        $('#error').show();
        return;
    }
}