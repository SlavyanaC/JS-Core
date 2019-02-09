function solve() {
    let list = [];
    let totalPrice = 0;
    let decorationFactors = [];

    document.getElementsByTagName('button')[0].addEventListener('click', () => {
        let furnitureList = JSON.parse(document.getElementsByTagName('textarea')[0].value);
        for (let furniture of furnitureList) {
            let div = document.createElement('div');
            div.classList.add('furniture');
            let name = document.createElement('p');
            name.innerHTML = `Name: ${furniture.name}`;
            let img = document.createElement('img');
            img.setAttribute('src', furniture.img);
            let price = document.createElement('p');
            price.innerHTML = `Price: ${furniture.price}`;
            let decorationFactor = document.createElement('p');
            decorationFactor.innerHTML = `Decoration factor: ${furniture.decFactor}`;
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');

            div.appendChild(name);
            div.appendChild(img);
            div.appendChild(price);
            div.appendChild(decorationFactor);
            div.appendChild(checkbox);

            document.getElementById('furniture-list').appendChild(div);
        }
    });

    document.getElementsByTagName('button')[1].addEventListener('click', () => {
        let array = Array.from(document.getElementById('furniture-list').children);
        for (let furniture of array) {
            let isChecked = furniture.getElementsByTagName('input')[0].checked;
            if (isChecked) {
                let name = furniture.getElementsByTagName('p')[0].innerHTML.split(': ')[1];
                list.push(name);
                let price = +furniture.getElementsByTagName('p')[1].innerHTML.split(': ')[1];
                totalPrice += price;
                let decorationFactor = +furniture.getElementsByTagName('p')[2].innerHTML.split(': ')[1];
                decorationFactors.push(decorationFactor);
            }
        }
        let textArea = document.getElementsByTagName('textarea')[1];
        textArea.value += `Bought furniture: ${list.join(', ')}\r\n`;
        textArea.value += `Total price: ${totalPrice.toFixed(2)}\r\n`;
        let avgDecFactor = decorationFactors.reduce((a, b) => a + b) / decorationFactors.length;
        textArea.value += `Average decoration factor: ${avgDecFactor}`;
    });
}