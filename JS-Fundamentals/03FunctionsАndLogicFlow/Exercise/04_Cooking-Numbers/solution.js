function solve() {
    let inputField = document.querySelector('div input[type="number"]');

    let actionsObject = {
        'chop': num => num / 2,
        'dice': num => Math.sqrt(num),
        'spice': num => num + 1,
        'bake': num => num * 3,
        'fillet': num => num * 0.8,
    };

    Array.from(document.querySelectorAll('#operations button'))
        .forEach(btn => btn.addEventListener('click', (e) => executeAction(executeAction(e))));

    function executeAction(e) {
        let outputParagraph = document.getElementById('output');
        let num = 0;
        outputParagraph.textContent === '' ? num = +inputField.value : num = +outputParagraph.textContent;
        let action = e.target.textContent;
        outputParagraph.textContent = actionsObject[action.toLowerCase()](num);
    }
}