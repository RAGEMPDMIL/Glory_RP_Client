$(document).ready(function() {
    $('.authentication-loading-spinner').hide();
});

function submitRegistration() {
    let login = document.getElementById('login');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let passwordConfirmation = (document.getElementById('passwordConfirmation').value == password.value);

    const emailValid = email.checkValidity();
    const passwordValid = password.checkValidity();

    if(!passwordConfirmation) {
        
    }

    if(!emailValid) {
    }

    if(!passwordValid) {
    }
    
    if (passwordConfirmation && emailValid && passwordValid) {
        mp.trigger('client:register:SubmitRegistration', login.value, password.value, email.value);
    }
}
mp.trigger('client:auth:showLoginPage');

    function showLoginPage() {
}