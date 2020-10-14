$(document).ready(function() {
    $('.authentication-loading-spinner').hide();
});

function submitLogin() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if(username.length > 0 && password.length > 0) {
        $('#login-span').hide();
        $('.authentication-loading-spinner').show();
        mp.trigger('client:auth:userLogin', username, password);
    }
}

function showRegisterPage() {
    mp.trigger('client:auth:showRegisterPage');
}