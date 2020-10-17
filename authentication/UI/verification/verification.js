const modal = document.getElementsByClassName('authentication-modal');

$(document).ready(function () {
    handleErorrsAndHints();
    $('.authentication-loading-spinner').hide();
});

window.onclick = function(event) {
    if (event.target != modal) {
      $('#authentication-modal').css('display', 'none');
    }
  };



function submitVerification() {
    let insertedCode = document.getElementById('Verification-Code');
    $('#button-span').hide();
    $('.authentication-loading-spinner').show();

    mp.trigger('client:auth:checkVarification',insertedCode.value);
}

function didntGetMail(){
    mp.trigger('client:auth:resendMail');
    $('#resendMail').hide();
    setTimeout(function(){
        $('#resendMail').show();
    }, 60000);
    
}


function onBadRegister(handle) {
    switch (handle)
    {
        case 'codeNotCorrect':
            {
                $('.authentication-loading-spinner').hide();
                $('#button-span').show();
                $('#authentication-modal-text').text('The verification code incorrect please try again');
                $('#authentication-modal').show();
                break;
            }
    }
}



function handleErorrsAndHints() {
    $('#Verification-Code').focus(function () {
        $('#Verification-Code-placeholder').addClass('authentication-placeholder-up');
    });
    $('#Verification-Code').focusout(function () {
        if ($('#Verification-Code').val().length === 0) {
            $('#Verification-Code').css('border-color', 'red');
            $('#Verification-Code-placeholder').removeClass('authentication-placeholder-up');
            $('#Verification-Code-hint').text('Verification-Code field is required');
            $('#Verification-Code-hint').css('color', 'red');
        } else if ($('#Verification-Code').val().length < 6 && $('#Verification-Code').val().length > 0) {
            $('#Verification-Code').css('border-color', 'red');
            $('#Verification-Code-hint').text('Verification-Code field must have at least 6 characters');
            $('#Verification-Code-hint').css('color', 'red');
        }else {
            $('#Verification-Code').css('border-color', '#d3d3d3');
            $('#Verification-Code-hint').text('');
        }
    })
}