function solve() {
    Array.from(document.getElementsByTagName('button'))
        .forEach(btn => btn.addEventListener('click', showAdditionalInfo));

    function showAdditionalInfo(e) {
        let parentElement = e.target.parentElement;
        let lockedRadio = parentElement.querySelectorAll('input')[0];
        console.log(lockedRadio.checked);
        if (!lockedRadio.checked) {
            let hiddenElements = parentElement.querySelector('[id$="HiddenFields"]');
            if (e.target.textContent === 'Show more') {
                hiddenElements.style.display = 'block';
                e.target.textContent = 'Hide it';
            } else {
                hiddenElements.style.display = 'none';
                e.target.textContent = 'Show more';
            }
        }
    }
}