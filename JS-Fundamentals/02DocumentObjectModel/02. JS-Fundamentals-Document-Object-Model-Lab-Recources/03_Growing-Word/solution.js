function solve() {
    document.getElementsByTagName('button')[0].addEventListener('click', () => {
        let colors = ['blue', 'green', 'red'];
        let paragraphElement = document.querySelector('#exercise p');
        let currentColor = paragraphElement.style.color;
        let currentSize = paragraphElement.style.fontSize.slice(0, -2);

        let newSize = +currentSize + 2;
        let currentColorIndex = colors.indexOf(currentColor);
        let nextColor = currentColorIndex + 1 >= colors.length ? colors[0] : colors[currentColorIndex + 1];

        paragraphElement.style.cssText = `color: ${nextColor}; font-size: ${newSize}px`;
    });
}