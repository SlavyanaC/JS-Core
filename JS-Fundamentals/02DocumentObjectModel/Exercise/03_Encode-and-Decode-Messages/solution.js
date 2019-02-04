function solve() {
    let buttons = document.getElementsByTagName('button');
    let textAreas = document.getElementsByTagName('textarea');

    buttons[0].addEventListener('click', encode);
    function encode() {
        let messageToEncode = textAreas[0].value;
        let encodedMessage = '';
        messageToEncode.split('').forEach(char => {
            let asciiValue = char.codePointAt(0) + 1;
            encodedMessage += String.fromCharCode(asciiValue);
        });
        textAreas[0].value = '';
        textAreas[1].value = encodedMessage;
    }

    buttons[1].addEventListener('click', decode);
    function decode() {
        let messageToDecode = textAreas[1].value;
        let decodedMessage = '';
        messageToDecode.split('').forEach(char => {
            let asciiValue = char.codePointAt(0) - 1;
            decodedMessage += String.fromCharCode(asciiValue);
        });
        textAreas[1].value = decodedMessage;
    }
}