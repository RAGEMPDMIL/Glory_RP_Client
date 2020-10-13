function submitRegistration(){
    let login = document.getElementById(login);
    let password = document.getElementById(password);
    let passwordConfirmation = (document.getElementById(passwordConfirmation)==password);
    let email = document.getElementById(email);

    mp.trigger('register:SubmitRegistration', login, password, email);
}

function showLoginPage() {
    mp.trigger('client:register:showLoginPage');
}
