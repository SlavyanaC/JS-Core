function solve() {
    let sections = document.getElementsByTagName('section');
    let buttons = document.getElementsByTagName('button');
    let correctAnswers = {0: '2013', 1: 'Pesho', 2: 'Nakov'};
    let correctAnswersCount = 0;
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].addEventListener('click', function (e) {
            {
                let ratioBtns = this.parentElement.querySelectorAll('input');
                let answer;
                for (let radioBtn of ratioBtns) {
                    if (radioBtn.checked) {
                        answer = radioBtn.value;
                        if (answer === correctAnswers[index]) {
                            correctAnswersCount++;
                        }
                    }
                }

                if (index < sections.length - 1) {
                    sections[index].className = 'hidden';
                    sections[index + 1].className = '';
                } else {
                    let result = document.getElementById('result');
                    if (correctAnswersCount < 3) {
                        result.innerHTML = `You have ${correctAnswersCount} right answers`;
                    } else {
                        result.innerHTML = `You are recognized as top SoftUni fan!`;
                    }
                }
            }
        });
    }
}

