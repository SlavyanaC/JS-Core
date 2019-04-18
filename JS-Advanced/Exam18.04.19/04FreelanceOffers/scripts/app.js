function solve() {
    let $notification = $('#notification');
    let $loginBtn = $('#loginBtn');
    let $addOfferDiv = $('#create-offers');
    $('form').submit((e) => e.preventDefault());
    $loginBtn.text() === 'Login' ? $addOfferDiv.css('display', 'none') : $addOfferDiv.css('display', 'block');
    $loginBtn.on('click', controlUser);
    $('#create-offer-Btn').on('click', createOffer);

    function controlUser() {
        if ($loginBtn.text() === 'Logout') {
            let $usernameField = $('#username');
            $usernameField.addClass('border-0 bg-light');
            $usernameField.removeClass('border-0 bg-light');
            $usernameField.prop('disabled', false);
            $usernameField.val(``);
            $loginBtn.text('Login');
            $addOfferDiv.css('display', 'none');
        } else {
            let $usernameField = $('#username');
            let username = $usernameField.val();
            if (username.length >= 4 && username.length <= 10) {
                $usernameField.addClass('border-0 bg-light');
                $usernameField.prop('disabled', true);
                $usernameField.val(`Hello, ${username}!`);
                $loginBtn.text('Logout');
                $addOfferDiv.css('display', 'block');
            } else {
                $notification.text('The username length should be between 4 and 10 characters.');
            }
        }
    }

    function createOffer() {
        let $nameInput = $('#offerName');
        let $companyInput = $('#company');
        let $createInput = $('#description');

        if ($nameInput.val() && $companyInput.val() && $createInput.val()) {
            let $offersContainer = $('#offers-container');
            let offer =
                `<div class="col-3">
                <div class="card text-white bg-dark mb-3 pb-3" style="max-width: 18rem;">
                    <div class="card-header">${$nameInput.val()}</div>
                    <div class="card-body">
                        <h5 class="card-title">${$companyInput.val()}</h5>
                        <p class="card-text">${$createInput.val()}</p>
                    </div>
                </div>
            </div>`;
            $offersContainer.append(offer);
            $nameInput.val('');
            $companyInput.val('');
            $createInput.val('');
        }
    }
}

solve();