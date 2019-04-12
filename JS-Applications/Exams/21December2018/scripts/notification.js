const notifications = (() => {
    $(document).on({
        ajaxStart: () => {
            $('#loadingBox').show();
        },
        ajaxStop: () => {
            $('#loadingBox').fadeOut();
        },
    });

    function showInfo(msg) {
        let $infoBox = $('#infoBox');
        let $infoSpan = $('#infoBox span');
        $infoSpan.text(msg);
        $infoBox.fadeIn();
        $infoBox.fadeOut(3000);
    }

    function showError(msg) {
        let $errorBox = $('#errorBox');
        let $errorSpan = $('#errorBox span');
        $errorSpan.text(msg);
        $errorBox.fadeIn();
        $errorBox.fadeOut(3000);
    }

    function handleError(err){
       notifications.showError(err.responseJSON.description);
    }

    return {
        showInfo,
        showError,
        handleError,
    }
})();