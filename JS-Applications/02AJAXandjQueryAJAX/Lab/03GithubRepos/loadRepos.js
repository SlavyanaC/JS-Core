function loadRepos() {
    const baseUrl = "https://api.github.com/users/";
    $('#repos').empty();
    let username = $('#username').val();
    let url = baseUrl + username + "/repos";
    $.ajax({
        url: url,
        method: "GET",
        success: displayRepos,
        error: displayError,
    });

    function displayRepos(repos) {
        repos.forEach(r => {
            let $a = $("<a>").text(r.full_name);
            $a.attr("href", r.html_url);
            let $li = $("<li>").append($a);
            $('#repos').append($li);
        });
    }

    function displayError(error) {
        $("#repos").append($("<li>Error</li>"));
    }
}