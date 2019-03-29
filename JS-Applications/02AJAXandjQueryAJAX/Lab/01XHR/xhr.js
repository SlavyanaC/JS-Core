function loadRepos() {
    $('#res').empty();
    let username = "SlavyanaC";
    let url = "https://api.github.com/users/" + username + "/repos";
    $.ajax({
        url: url,
        success: (data) => {
            $('#res').text(JSON.stringify(data));
        }
    })
}