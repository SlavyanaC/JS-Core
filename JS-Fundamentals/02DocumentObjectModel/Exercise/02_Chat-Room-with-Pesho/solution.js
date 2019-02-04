function solve() {
    Array.from(document.getElementsByTagName('button'))
        .forEach(btn => {
            btn.addEventListener('click', function (e) {
                let divElement = document.createElement('div');
                let spanElement = document.createElement('span');
                let paragraph = document.createElement('p');

                let senderBtn = e.target.name;
                if (senderBtn === 'myBtn') {
                    spanElement.textContent = 'Me';
                    paragraph.textContent = document.getElementById('myChatBox').value;
                    divElement.style.textAlign = 'left';
                } else if (senderBtn === 'peshoBtn') {
                    spanElement.textContent = 'Pesho';
                    paragraph.textContent = document.getElementById('peshoChatBox').value;
                    divElement.style.textAlign = 'right';
                }

                divElement.appendChild(spanElement);
                divElement.appendChild(paragraph);
                document.getElementById('chatChronology').appendChild(divElement);

                Array.from(document.getElementsByTagName('input'))
                    .forEach(i => i.value = '');

            })
        });
}