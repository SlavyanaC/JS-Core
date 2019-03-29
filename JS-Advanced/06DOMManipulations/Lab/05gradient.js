function attachGradientEvents() {
    let divElements = document.querySelectorAll('div div');
    for (let divElem of divElements) {
        divElem.addEventListener('focus', function(){
            divElem.classList.add('focused');
        });
        divElem.addEventListener('blur', function(){
            divElem.classList.remove('focused');
        });
    }
}