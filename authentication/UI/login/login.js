function submitLogin() {
    let username = document.getElementById('username');
    let password = document.getElementById('password');

    mp.trigger('client:auth:userLogin', username.value, password.value);
}

function showRegisterPage() {
    mp.trigger('client:auth:showRegisterPage');
}