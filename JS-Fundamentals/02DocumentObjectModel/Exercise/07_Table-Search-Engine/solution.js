function solve() {
    let exerciseElement = document.getElementById('exercise');
    let tableRows = exerciseElement.getElementsByTagName('tr');
    document.getElementById('searchBtn').addEventListener('click', () => {
        clearSearchFieldAndResults(tableRows);

        let searchField = document.getElementById('searchField');
        for (let row of tableRows) {
            let tds = row.getElementsByTagName('td');
            for (let td of tds) {
                if (td.textContent.toLowerCase().match(searchField.value.toLowerCase())) {
                    row.classList.add('select');
                }
            }
        }

        searchField.value = '';
    });

    function clearSearchFieldAndResults(tableRows) {
        for (let row of tableRows) {
            row.classList.remove('select');
        }
    }
}