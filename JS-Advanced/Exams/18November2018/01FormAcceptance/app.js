function acceptance() {
    let $fields = $('#fields').find('td input');
    let $company = $fields.eq(0);
    let $product = $fields.eq(1);
    let $quantity = $fields.eq(2);
    let $scrape = $fields.eq(3);

    if ($company.val() !== '' && $product.val() !== '' && !isNaN($quantity.val()) && !isNaN($scrape.val()) && +$quantity.val() - +$scrape.val() > 0) {
        let $productElem = $(`<div><p>[${$company.val()}] ${$product.val()} - ${+$quantity.val() - +$scrape.val()} pieces</p><button type="button">Out of stock</button></div>`);
        $productElem.find('button').on('click', () => {
            $productElem.remove();
        });

        $('#warehouse').append($productElem);

        $company.val('');
        $product.val('');
        $quantity.val('');
        $scrape.val('');
    }
}