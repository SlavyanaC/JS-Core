function solve() {
    let links = document.querySelectorAll('#exercise div');
    for (let i = 0; i < links.length; i++) {
        let element = links[i];
        element.id = `link${i}`;
        element.children[0].addEventListener('click', function () {
            let spanElement = document.querySelector(`#${element.id} span`);
            let currentCount = +spanElement.textContent.match(/\d+/);
            spanElement.textContent = spanElement.textContent.replace(/\d+/, ++currentCount);
        });
    }
}