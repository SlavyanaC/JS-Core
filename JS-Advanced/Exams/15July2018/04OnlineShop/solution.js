function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);

    const TOTAL_CAPACITY = 150;

    let $product = $('.custom-select');
    let $price = $('#price');
    let $quantity = $('#quantity');
    let $button = $('#submit');
    let $inventoryList = $('.display');
    let $capacity = $('#capacity');
    let $totalPrice = $('#sum');

    $product.on('input', () => {
        let isEmpty = $product.val() === '';
        $button.attr('disabled', isEmpty);
    });

    $button.on('click', addProductToInventory);

    function addProductToInventory() {
        let currentCapacity = +$capacity.val();
        let currentProductQuantity = +$quantity.val();
        let neededCapacity = currentCapacity + currentProductQuantity;
        if (neededCapacity >= TOTAL_CAPACITY) {
            disableFunctionality();
        } else {
            let $li = $(`<li>Product: ${$product.val()} Price: ${$price.val()} Quantity: ${$quantity.val()}</li>`);
            $inventoryList.append($li);
            $capacity.val(neededCapacity);
            $totalPrice.val(+$totalPrice.val() + +$price.val());
            resetFields();
        }
    }

    function resetFields() {
        $product.val('');
        $price.val(1);
        $quantity.val(1);
        $button.attr('disabled', true);
    }

    function disableFunctionality() {
        $capacity.val('full');
        $capacity.addClass('fullCapacity');
        $product.attr('disabled', true);
        $price.attr('disabled', true);
        $quantity.attr('disabled', true);
        $button.attr('disabled', true);
    }
}
