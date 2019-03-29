function addDestination() {
    let $input = $('#input');
    let $city = $input.children('input').eq(0);
    let $country = $input.children('input').eq(1);

    let $seasons = $('#seasons').children();
    let selectedSeason = $seasons.filter(':selected').text();

    if ($city.val() !== '' && $country.val() !== '') {
        let $tbody = $('#destinationsList');
        let row = `<tr><td>${$city.val()}, ${$country.val()}</td><td>${selectedSeason}</td></rd></tr>`;
        $tbody.append(row);

        let seasons = { Summer: 0, Autumn: 1, Winter:2, Spring: 3};
        let $summaryBox = $('#summaryBox').children('input');
        let destinationsCount = +$summaryBox.eq(seasons[selectedSeason]).val() + 1;
        $summaryBox.eq(seasons[selectedSeason]).val(destinationsCount);
    }

    $city.val('');
    $country.val('');
}
