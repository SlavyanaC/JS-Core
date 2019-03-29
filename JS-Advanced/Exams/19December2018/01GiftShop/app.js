function solution() {
    let $type = $('#toyType');
    let $price = $('#toyPrice');
    let $description = $('#toyDescription');

    $('button').on('click', () => {
        if ($type.val() !== '' && !isNaN($price.val()) && $description.val().length >= 50) {
            let $gift = $(`<div class="gift"><img src="gift.png"><h2>${$type.val()}</h2><p>${$description.val()}</p><button>Buy it for $${$price.val()}</button></div>`);
            $gift.find('button').on('click', () =>{
                $gift.remove();
            });

            $('#christmasGiftShop').append($gift);

            $type.val('');
            $price.val('');
            $description.val('');
        }
    });
}