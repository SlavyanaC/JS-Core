function realEstateAgency() {
    $('#regOffer').find('button').on('click', makeOffer);
    $('#findOffer').find('button').on('click', findOffer);
    let $message = $('#message');

    function makeOffer() {
        let $offerForm = $('#regOffer').find('input');
        let $rent = $offerForm.eq(0);
        let $type = $offerForm.eq(1);
        let $commission = $offerForm.eq(2);

        if (isNaN($rent.val()) || $rent.val() <= 0 || isNaN($commission.val()) || $commission.val() < 0 || $commission.val() > 100 || $type.val() === '' || $type.val().includes(':')) {
            $message.text('Your offer registration went wrong, try again.');
        } else {
            let $buildings = $('#building');
            let offer = `<div class="apartment"><p>Rent: ${$rent.val()}</p><p>Type: ${$type.val()}</p><p>Commission: ${$commission.val()}</p></div>`;
            $buildings.append(offer);
            $message.text('Your offer was created successfully.');
        }

        $rent.val('');
        $type.val('');
        $commission.val('');
    }

    function findOffer() {
        let $offerForm = $('#findOffer').find('input');
        let $budget = $offerForm.eq(0);
        let $type = $offerForm.eq(1);
        let $name = $offerForm.eq(2);

        if (!isNaN($budget.val()) && $budget.val() > 0 && $type.val() !== '' && $name.val() !== '') {
            let $offers = $('#building').children();
            for (let offer of $offers) {
                let ps = offer.children;
                let rentContent = ps[0].textContent.substr(ps[0].textContent.indexOf(' '));
                let typeContent = ps[1].textContent.substring(ps[1].textContent.indexOf(' '));
                let commissionContent = ps[2].textContent.substring(ps[2].textContent.indexOf(' '));
                let apartmentCommission = (+rentContent * commissionContent / 100);
                let totalPrice = +rentContent + apartmentCommission;
                if (+rentContent <= totalPrice && typeContent.trim() === $type.val()) {
                    let $profit = $('#roof h1');
                    let totalProfit = $profit.text().substring($profit.text().indexOf(':') + 1, $profit.text().lastIndexOf(' '));
                    totalProfit = +totalProfit + (+apartmentCommission * 2);
                    $profit.text(`Agency profit: ${totalProfit} lv.`);
                    let moveOutBtn = '<button>MoveOut</button>'
                    let $currentOffer = $(offer);
                    $currentOffer.css('border', '2px solid red');

                    let result = $currentOffer.find('p');
                    console.log(result);
                    let name = $name.val();
                    result.eq(0).text(`${name}`);
                    result.eq(1).text('live here now');
                    result.eq(2).remove();

                    $currentOffer.append(moveOutBtn);
                    $currentOffer.find('button').on('click', () => {
                        $message.text(`They had found cockroaches in ${name}\'s apartment`);
                        $currentOffer.remove();
                    });
                    $message.text('Enjoy your new home! :))');
                } else {
                    $message.text('We were unable to find you a home, so sorry :(');
                }
            }
        } else {
            $message.text('We were unable to find you a home, so sorry :(');
        }

        $budget.val('');
        $type.val('');
        $name.val('');
    }
}
