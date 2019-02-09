function solve() {
    let products = [];
    let productElements =  document.getElementsByClassName('product');
    for (let i = 0; i < productElements.length; i++) {
        let element = productElements[i];
        let name = element.children[1].innerHTML;
        let price = +element.children[2].innerHTML.split(' ')[1];

        document.getElementsByTagName('button')[i].addEventListener('click', () => {
            products.push({name, price});
            let textarea = document.getElementsByTagName('textarea')[0];
            textarea.value += `Added ${name} for ${price.toFixed(2)} to the cart.\r\n`;
        });
    }

    document.getElementsByTagName('button')[3].addEventListener('click', () => {
        let list = products.map(p => p.name).filter((el, idx, arr) => {
            if (arr.indexOf(el) === idx) {
                return el;
            }
        });
        let totalPrice = products.map(p => p.price).reduce((a, b) =>  a + b );
        let textarea = document.getElementsByTagName('textarea')[0];
        textarea.value += `You bought ${list.join(', ')} for ${totalPrice.toFixed(2)}.\r\n`
    });
}