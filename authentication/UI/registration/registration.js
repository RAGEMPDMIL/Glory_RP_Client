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

function submitRegistration() {
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let passwordConfirmation = (document.getElementById('password-confirmation').value == password.value);

    const emailValid = email.checkValidity();
    const passwordValid = password.checkValidity();

    if (passwordConfirmation && emailValid && passwordValid && username.value.length > 6) {
        console.log('here');
        $('#button-span').hide();
        $('.authentication-loading-spinner').show();
        mp.trigger('client:auth:SubmitRegistration', username.value, password.value, email.value);
    }
}

function showLoginPage() {
    mp.trigger('client:auth:showLoginPage');
}

function onBadLogin(handle) {
    switch (handle)
    {
        case 'userExists':
        {
            $('.authentication-loading-spinner').hide();
            $('#button-span').show();
            $('#authentication-modal-text').text('Register failed! User already exists.');
            $('.authentication-modal').show();
            break;
        }
    }
}

function handleErorrsAndHints() {
    $('#username').focus(function () {
        $('#username-placeholder').addClass('authentication-placeholder-up');
    });

    $('#email').focus(function () {
        $('#email-placeholder').addClass('authentication-placeholder-up');
    });

    $('#password').focus(function () {
        $('#password-placeholder').addClass('authentication-placeholder-up');
    });

    $('#password-confirmation').focus(function () {
        $('#password-confirmation-placeholder').addClass('authentication-placeholder-up');
    });

    $('#username').focusout(function () {
        if ($('#username').val().length === 0) {
            $('#username').css('border-color', 'red');
            $('#username-placeholder').removeClass('authentication-placeholder-up');
            $('#username-hint').text('Username field is required');
            $('#username-hint').css('color', 'red');
        } else if ($('#username').val().length <= 6 && $('#username').val().length > 0) {
            $('#username').css('border-color', 'red');
            $('#username-hint').text('Username field must have at least 6 characters');
            $('#username-hint').css('color', 'red');
        } else {
            $('#username').css('border-color', '#d3d3d3');
            $('#username-hint').text('');
        }
    });

    $('#email').focusout(function () {
        let email = document.getElementById('email');

        if ($('#email').val().length === 0) {
            $('#email').css('border-color', 'red');
            $('#email-placeholder').removeClass('authentication-placeholder-up');
            $('#email-hint').text('Email field is required');
            $('#email-hint').css('color', 'red');
        } else if (!email.checkValidity()) {
            $('#email').css('border-color', 'red');
            $('#email-hint').text('Email is invalid');
            $('#email-hint').css('color', 'red');
        } else {
            $('#email').css('border-color', '#d3d3d3');
            $('#email-hint').text('');
        }
    });

    $('#password').focusout(function () {
        let password = document.getElementById('password');

        if ($('#password').val().length === 0) {
            $('#password').css('border-color', 'red');
            $('#password-placeholder').removeClass('authentication-placeholder-up');
            $('#password-hint').text('Password field is required');
            $('#password-hint').css('color', 'red');
        } else if (!password.checkValidity()) {
            $('#password').css('border-color', 'red');
            $('#password-hint').text('Password is invalid');
            $('#password-hint').css('color', 'red');
        } else {
            $('#password').css('border-color', '#d3d3d3');
            $('#password-hint').text('');
        }
    });

    $('#password-confirmation').focusout(function () {
        if ($('#password-confirmation').val().length === 0) {
            $('#password-confirmation').css('border-color', 'red');
            $('#password-confirmation-placeholder').removeClass('authentication-placeholder-up');
            $('#password-confirmation-hint').text('Password confirmation field is required');
            $('#password-confirmation-hint').css('color', 'red');

        } else if ($('#password-confirmation').val() !== $('#password').val()) {
            $('#password-confirmation').css('border-color', 'red');
            $('#password-confirmation-hint').text('Passwords must be identical');
            $('#password-confirmation-hint').css('color', 'red');
        } else {
            $('#password-confirmation').css('border-color', '#d3d3d3');
            $('#password-confirmation-hint').text('');
        }
    });
}