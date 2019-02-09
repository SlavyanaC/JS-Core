function solve() {
    let arrElement = document.getElementById('arr');
    let arr = JSON.parse(arrElement.value);
    let key = arr[0];

    let matches = getMatches(arr);
    let decodedMessages = decodeMessage(matches);

    let resultElement = document.getElementById('result');
    for (let lineIndex = 1; lineIndex < arr.length; lineIndex++) {
        for (let matchIndex in matches){
            if (arr[lineIndex].toString().includes(matches[matchIndex])) {
                let oldValue = matches[matchIndex];
                let newValue = decodedMessages[matchIndex];
                arr[lineIndex] = arr[lineIndex].replace(oldValue, newValue);
            }
        }

        let resultParagraph = document.createElement('p');
        resultParagraph.innerHTML = arr[lineIndex];
        resultElement.appendChild(resultParagraph);
    }

    function getMatches(arr) {
        let regExp = new RegExp('(^|\\s)' + key + '\\s+(!|%|\\$|#|[A-Z]){8,}(\\s|\\.|\\,|$)', 'gmi');
        let allMessages = [];
        for (let index = 1; index < arr.length; index++) {
            let matches = arr[index].match(regExp);
            if (matches !== null) {
                for (let fullMatch of matches) {
                    let matchElements = fullMatch.toString().trim().split(' ');
                    let msg = matchElements[matchElements.length - 1];
                    allMessages.push(msg);
                }
            }
        }

        return allMessages.filter(function (value) {
            let validMessageExp = new RegExp('(!|%|\\$|#|[A-Z]){8,}(\\s|\\.|,|$)', 'gm');
            let match = value.match(validMessageExp);
            return match !== null;
        });
    }

    function decodeMessage(arr) {
        let decodedMessages = [];
        for (let msg of arr) {
            msg = replaceAll(msg, '!', '1');
            msg = replaceAll(msg, '%', '2');
            msg = replaceAll(msg, '#', '3');
            msg = replaceAll(msg, '\\$', '4');
            msg = msg.toLowerCase();

            decodedMessages.push(msg);
        }

        return decodedMessages;
    }

    function replaceAll(text, oldChar, newChar) {
        text = text.replace(new RegExp(oldChar, 'g'), newChar);
        return text;
    }
}