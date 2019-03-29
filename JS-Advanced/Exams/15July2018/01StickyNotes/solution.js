function addSticker() {
    let $title = $('.title');
    let $content = $('.content');

    if ($title.val() !== '' && $content.val() !== '') {
        let $noteHtml = $.parseHTML(`<li class="note-content"><a class="button">x</a><h2>${$title.val()}</h2><hr/><p>${$content.val()}</p></li>`);
        let $note = $($noteHtml);
        $note.find('.button').click(() => { $note.remove(); });
        $('#sticker-list').append($note);
    }

    $title.val('');
    $content.val('');
}