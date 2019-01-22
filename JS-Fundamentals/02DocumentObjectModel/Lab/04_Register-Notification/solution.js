function register() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let emailRegex = new RegExp('(.+)@(.+).(com|bg)');
    if (username && password && email.match(emailRegex)){
        let resultSection = document.getElementById('result');
        let h1 = document.createElement('h1');

        h1.textContent = 'Successful Registration!';
        resultSection.appendChild(h1);

        resultSection.innerHTML += `Username: ${username}<br>Email: ${email}<br>Password: ${"*".repeat(password.length)}`;

        setTimeout(function () {
            resultSection.innerHTML = '';
        }, 5000);
    }
}
