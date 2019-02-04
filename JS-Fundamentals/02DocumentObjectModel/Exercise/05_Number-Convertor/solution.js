function solve() {
    let toSelectElement = document.getElementById('selectMenuTo');

    let binaryOption = document.createElement('option');
    binaryOption.id = 'binaryOption';
    binaryOption.value = 'binary';
    binaryOption.textContent = 'Binary';

    let hexadeicmalOption = document.createElement('option');
    hexadeicmalOption.id = 'hexadeicmalOption';
    hexadeicmalOption.value = 'hexadeicmal';
    hexadeicmalOption.textContent = 'Hexadeicmal';

    toSelectElement.appendChild(binaryOption);
    toSelectElement.appendChild(hexadeicmalOption);

    document.getElementsByTagName('button')[0].addEventListener('click', convert);

    function convert(e) {
        let parentElement = e.target.parentElement;
        let decimalNum = +parentElement.querySelector('#input').value;
        let toSelectMenu = Array.from(parentElement.querySelector('#selectMenuTo').children).;
        let convertType;
        for (let index in toSelectMenu) {
            if (toSelectMenu[index].selected === true) {
                convertType = toSelectMenu[index].textContent;
            }
        }

        let resultElement = parentElement.parentElement.querySelector('div #result');
        console.log(resultElement);
        if (convertType === 'Binary') {
            let binary = (parseInt(+decimalNum, 10)).toString(2);
            resultElement.value = binary;
        } else {
            if (+decimalNum < 0) {
                decimalNum = 0xFFFFFFFF + decimalNum + 1;
            }
            resultElement.value = decimalNum.toString(16).toUpperCase();
        }
    }
}