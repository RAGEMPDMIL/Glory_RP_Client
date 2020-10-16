const modal = document.getElementsByClassName('authentication-modal');

$(document).ready(function () {
    $('.authentication-loading-spinner').hide();
});

window.onclick = function(event) {
    if (event.target != modal) {
      $('.authentication-modal').css('display', 'none');
    }
  };

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

function onBadLogin(handle) {
    switch (handle)
    {
        case 'incorrectInfo':
        {
            $('.authentication-loading-spinner').hide();
            $('#login-span').show();
            $('#authentication-modal-text').text('Login denied! Please check your credentials.')
            $('.authentication-modal').show();
            break;
        }
        case 'logged':
        {
            $('.authentication-loading-spinner').hide();
            $('#login-span').show();
            $('#authentication-modal-text').text('Login denied! The account is already logged in.')
            $('.authentication-modal').show();
            break;
        }
        case 'doesntExist':
        {
            $('.authentication-loading-spinner').hide();
            $('#login-span').show();
            $('#authentication-modal-text').text('Login denied! The account doesn\'n exist');
            $('.authentication-modal').show();
            break;
        }
    }
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
            $('#username').css('border-color', 'red');
            $('#login-placeholder').removeClass('authentication-placeholder-up');
            $('#username-hint').text('Username field is required');
            $('#username-hint').css('color', 'red');
        } else {
            $('#username').css('border-color', '#d3d3d3');
            $('#username-hint').text('');
        }
    });

    $('#password').focusout(function () {
        if ($('#password').val().length === 0) {
            $('#password').css('border-color', 'red');
            $('#password-placeholder').removeClass('authentication-placeholder-up');
            $('#password-hint').text('Password field is required');
            $('#password-hint').css('color', 'red');
        } else {
            $('#password').css('border-color', '#d3d3d3');
            $('#password-hint').text('');
        }
    });
}