$(document).ready(function () {
    $('.authentication-loading-spinner').hide();
});

handleErorrsAndHints();

function submitLogin() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username.length > 0 && password.length > 0) {
        $('#login-span').hide();
        $('.authentication-loading-spinner').show();
        mp.trigger('client:auth:userLogin', username, password);
    }
}

function showRegisterPage() {
    mp.trigger('client:auth:showRegisterPage');
}

function handleErorrsAndHints() {
    $('#username').focus(function () {
        $('#login-placeholder').addClass('authentication-placeholder-up');
    });

    $('#password').focus(function () {
        $('#password-placeholder').addClass('authentication-placeholder-up');
    });

    $('#username').focusout(function () {
        if ($('#username').val().length === 0) {
            $('#login-placeholder').removeClass('authentication-placeholder-up');
            $('#username-hint').show();
        } else {
            $('#username-hint').hide();
        }
    });

    $('#password').focusout(function () {
        if ($('#password').val().length === 0) {
            $('#password').css('border-color', 'red');
            $('#password-placeholder').removeClass('authentication-placeholder-up');
            $('#password-hint').text("Password field is required");
            $('#password-hint').css('color', 'red');
        } else {
            $('#password').css('border-color', '#d3d3d3');
            $('#password-hint').text("");
        }
    });
}