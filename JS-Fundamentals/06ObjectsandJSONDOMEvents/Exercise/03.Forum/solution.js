function solve() {
    document.getElementsByTagName('button')[0].addEventListener('click', (e) => {
        e.preventDefault();
        let userInfoArr = document.getElementsByClassName('user-info')[0].children;

        let user = {
            username: userInfoArr[1].value,
            email: userInfoArr[5].value,
            topics: Array.from(document.getElementsByClassName('topics')[0].children).filter(el => el.checked).map(el => el.value)
        };

        let tr = document.createElement('tr');
        let tdUsername = document.createElement('td');
        tdUsername.innerHTML = user.username;
        let tdEmail = document.createElement('td');
        tdEmail.innerHTML = user.email;
        let tdTopics = document.createElement('td');
        tdTopics.innerHTML = user.topics.join(' ');

        tr.appendChild(tdUsername);
        tr.appendChild(tdEmail);
        tr.appendChild(tdTopics);

        document.getElementsByTagName('tbody')[0].appendChild(tr);
    });

    document.getElementsByTagName('button')[1].addEventListener('click', () => {
        let searchStr = document.querySelector('input[type="text"][placeholder="Search..."]').value;

        let tds = document.querySelectorAll('tbody tr td');
        for (let td of tds) {
            td.parentNode.style.visibility = 'hidden';
        }

        for (let td of tds) {
            if (td.textContent.includes(searchStr)) {
                td.parentNode.style.visibility = 'visible';
            }
        }
    });
}