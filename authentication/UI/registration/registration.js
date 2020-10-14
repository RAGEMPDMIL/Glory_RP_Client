function submitRegistration() {
    let login = document.getElementById('login');
    let password = document.getElementById('password');
    let passwordConfirmation = (document.getElementById('passwordConfirmation').value == password.value);
    let email = document.getElementById('email');
    console.log("got all values");
    if (passwordConfirmation) {
        console.log("sent to the client side function");
        mp.trigger('client:register:SubmitRegistration', login.value, password.value, email.value);
    }
}

function showLoginPage() {
    mp.trigger('client:register:showLoginPage');
}