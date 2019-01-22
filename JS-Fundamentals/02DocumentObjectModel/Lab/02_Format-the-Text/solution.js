function solve() {
    let input = document.getElementById('input');
    let sentences = input.innerHTML.split('. '); // for judge
    let output = document.getElementById('output');
    for (let i = 0; i < sentences.length; i += 3) {
        let paragraph = document.createElement('p');
        paragraph.textContent = sentences[i];
        if (sentences[i + 1] !== undefined) {
            paragraph.textContent += '. ' + sentences[i + 1];
        }
        if (sentences[i + 2] !== undefined) {
            paragraph.textContent += '. ' + sentences[i + 2];
        }
        output.appendChild(paragraph);
    }
}