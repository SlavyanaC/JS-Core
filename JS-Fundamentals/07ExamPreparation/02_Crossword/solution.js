function solve() {
    let output = document.querySelector('#output p');

    let filterBtn = document.getElementsByTagName('button')[0];
    filterBtn.addEventListener('click', () => {
        let type = Array.from(document.getElementById('filterSecondaryCmd').children)
            .filter(x => x.selected)[0].value;
        let position = document.getElementById('filterPosition').value;
        filter(type, position);
    });

    let sortBtn = document.getElementsByTagName('button')[1];
    sortBtn.addEventListener('click', () => {
        let type = Array.from(document.getElementById('sortSecondaryCmd').children)
            .filter(x => x.selected)[0].value;
        let position = document.getElementById('sortPosition').value;
        sort(type, position);
    });

    let rotateBtn = document.getElementsByTagName('button')[2];
    rotateBtn.addEventListener('click', () => {
        let type = document.getElementById('rotateSecondaryCmd').value;
        let position = document.getElementById('rotatePosition').value;
        rotate(type, position);
    });

    let getBtn = document.getElementsByTagName('button')[3];
    getBtn.addEventListener('click', () => {
        let position = document.getElementById('getPosition').value;
        get(position);
    });

    function get(position) {
        let input = document.getElementById('input').value.split('');
        output.textContent += input[position - 1];
    }

    function rotate(count, position) {
        let input = document.getElementById('input').value.split('');
        for (let i = 0; i < count; i++) {
            let lastElement = input.pop();
            input.unshift(lastElement);
        }

        output.textContent += input[position - 1];
    }

    function sort(type, position) {
        let input = document.getElementById('input').value;
        if (type === 'A') {
            output.innerHTML += input.split('').sort()[position - 1];
        } else if (type === 'Z') {
            output.innerHTML += input.split('').sort().reverse()[position - 1];
        }
    }

    function filter(type, position) {
        let input = document.getElementById('input').value;
        if (type === 'UPPERCASE'.toLowerCase()) {
            output.textContent += input.split('').filter(x => x === x.toUpperCase() && isNaN(x))[position - 1];
        } else if (type === 'LOWERCASE'.toLowerCase()) {
            output.textContent += input.split('').filter(x => x === x.toLowerCase() && isNaN(x))[position - 1];
        } else if (type === 'NUMS'.toLowerCase()) {
            output.textContent += input.split('').filter(x => !isNaN(x))[position - 1];
        }
    }
}