function solve() {
    let output = document.getElementById('output');

    document.getElementsByTagName('button')[0].addEventListener('click', () => {
        let input = document.getElementById('input').value;
        let charsToTake = +input.match(/[0-9]+/)[0];
        let inputTokens = input.slice(charsToTake.length, charsToTake + 2);
        let lastSymbol = inputTokens[inputTokens.length - 1];
        let pattern = inputTokens.split(lastSymbol)[0];
        let regex = new RegExp(`[${pattern}]+`, 'g');
        output.innerHTML = inputTokens.split(lastSymbol)[1].split(regex).join('').split('#').join(' ');
    });
}