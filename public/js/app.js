function initMap() {
    // Get map
    var lyonPosition = {lat: 45.75, lng: 4.85};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: lyonPosition
    });

    // Get stations
    var url = "https://api.jcdecaux.com/vls/v1/stations";
    var apiKey = "4046fd4b9fc4bb3fa4ef3f3c67efb9e2bbb41c25";
    var contract = "Lyon";
    $.ajax({
        url: url,
        data: {
            contract: contract, 
            apiKey: apiKey
        }
    })
        .done(function( msg ) {
            // Add markers
            $.each( msg, function( key, station ) {
                var marker = new google.maps.Marker({
                    position: station.position,
                    title: station.address,
                    map: map
                });
            });
        })
        .fail(function( jqXHR, textStatus ) {
            console.log( "Request failed: " + textStatus );
        });
}