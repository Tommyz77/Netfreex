function goToHome(backBtn) {
    //Nascondo le pagine
    $('#viewMovieContainer').addClass('hidden');
    $('#searchContainer').addClass('hidden');
    $('#homeContainer').removeClass('hidden');

    eraseViewMode();
    if (!backBtn)
        $('#bs-example-navbar-collapse-1').collapse('hide');
}

function goToSearch() {
    $('#homeContainer').addClass('hidden');
    $('#viewMovieContainer').addClass('hidden');
    $('#searchContainer').removeClass('hidden');

    eraseViewMode();

    $('#bs-example-navbar-collapse-1').collapse('hide');
}

function eraseViewMode() {
    movie = {
        titolo: "",
        backgroundImg: "",
        trama: "",
        attori: "",
        anno: "",
        durata: "",
        urls: [],

    };
    $('#moviePlot').html("");
    $("#locandina").attr("src", "");
    $("#movieTitle").html("");
    $("#movieDetails").css("background", "url('')");
    $('#playButton').html("");
    $('#cast').html("");
    $('#dataValue').html("");
    $('#durataValue').html("");
    $('#votoValue').html("");
    $('#generi').html("");
    $('#produzione').html("");
    $('#loadingLink').removeClass('hidden');
    $('#playButton').addClass('hidden');
    $('#playButton').removeClass('backgroundBlack');
}

function changeTab(num) {
    switch (num) {
        case 0:
            $('#riepilogo').removeClass('hidden');
            $('#dettagli').addClass('hidden');
            $('#riepilogoButton').addClass('viewButtonActive')
            $('#dettagliButton').removeClass('viewButtonActive')
            break;
        case 1:
            $('#riepilogo').addClass('hidden');
            $('#dettagli').removeClass('hidden');
            $('#riepilogoButton').removeClass('viewButtonActive')
            $('#dettagliButton').addClass('viewButtonActive')
            break;
    }
}