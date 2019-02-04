function solve() {
    let exerciseElement = document.getElementById('exercise');
    let buttons = document.getElementsByTagName('button');
    let nexButton = buttons[0];
    let cancelButton = buttons[1];

    let mainDiv = document.getElementById('content');
    let steps = document.querySelectorAll('#content div');
    let stepIndex = -1;
    nexButton.addEventListener('click', () => {
        mainDiv.style.background = 'none';
        stepIndex++;
        let stepToDisplay = steps[stepIndex];
        stepToDisplay.style.display = 'block';
    })
}