function addItem() {
    let text = $('#newItemText');
    let value = $('#newItemValue');

    $('#menu').append(`<option value="${value.val()}">${text.val()}</option>`);
    text.val('');
    value.val('');
}