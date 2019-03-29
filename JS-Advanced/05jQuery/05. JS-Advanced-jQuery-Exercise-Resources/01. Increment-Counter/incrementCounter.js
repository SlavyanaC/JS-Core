function increment(selector) {
    $(selector).append('<textarea class="counter" disabled>0</textarea>')
        .append('<button class="btn" id="incrementBtn">Increment</button>')
        .append('<button class="btn" id="addBtn">Add</button>')
        .append('<ul class="results"></ul>');

    let txt = $('textarea');

    $('#incrementBtn').click(() => {
        txt.val(+txt.val() + 1);
    });

    $('#addBtn').click(() => {
        $('ul').append($('<li>').text(txt.val()));
    });
}
