function validate() {
    $('#submit').click((e) => {
        e.preventDefault();

        let areValid = true;
        let username = $('#username');
        if (!username.val().match('^[a-zA-Z0-9]{3,20}$')) {
            username.css('border-color', 'red');
            areValid = false;
        } else {
            username.css('border', 'none');
        }

        let password = $('#password');
        let confPassword = $('#confirm-password');
        if (password.val().length < 5 || password.val().length > 15 || confPassword.val() !== password.val() || confPassword.val() === '') {
            password.css('border-color', 'red');
            confPassword.css('border-color', 'red');
            areValid = false;
        } else {
            password.css('border', 'none');
            confPassword.css('border', 'none');
        }

        let email = $('#email');
        let asd = email.val();
        if (!email.val().includes('@') || !asd.substr(asd.indexOf('@')).includes('.')) {
            email.css('border-color', 'red');
            areValid = false;
        } else {
            email.css('border', 'none');
        }

        let companyNumber = $('#companyNumber');
            if (companyNumber.val() < 1000 || companyNumber.val() > 9999) {
                companyNumber.css('border-color', 'red');
                areValid = false;
            } else {
                companyNumber.css('border', 'none');
            }

        if (areValid) {
            $('#valid').css('display', 'block');
        } else {
            $('#valid').css('display', 'none');
        }
    });

    $('#company').change(() => {
        let asd = $('#companyInfo').css('display');
        asd === 'none' ? $('#companyInfo').css('display', 'block') :
            $('#companyInfo').css('display', 'none');
    });
}
