function initMap() {
    // Get map
    var lyonPosition = {lat: 45.75, lng: 4.85};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: lyonPosition
    });

    // Get stations
    var url = 'https://api.jcdecaux.com/vls/v1/stations';
    var apiKey = '4046fd4b9fc4bb3fa4ef3f3c67efb9e2bbb41c25';
    var contract = 'Lyon';
    $.ajax({
        url: url,
        data: {
            contract: contract, 
            apiKey: apiKey
        }
    })
        .done(function(msg) {
            // Add markers
            $.each(msg, function(key, station) {
                var marker = new google.maps.Marker({
                    position: station.position,
                    title: station.address,
                    map: map
                });
                marker.addListener('click', function() {
                    $('#station').hide();
                    $('#book-button').hide();
                    $('#signature').hide();

                    var htmlString = 'Adresse: '+station.address+'<br /><br />';
                    htmlString += station.bike_stands+' places<br />';
                    htmlString += station.available_bikes+' vélos disponibles<br />';
                    $('#station-info').html(htmlString);

                    // Is a bike available?
                    if (station.available_bikes > 0) {
                        $('#book-button').show();
                        $('#book-button').click(function() {
                            $('#book-button').hide();
                            $('#signature').show();
                            $('#signature-validate-button').click(function() {
                                // Add booking
                                var booking = {
                                    station: {
                                        number: station.number,
                                        name: station.name,
                                        address: station.address
                                    },
                                    bookedAt: Date.now()
                                }
                                sessionStorage.setItem('booking', JSON.stringify(booking));
                            });
                        });
                    }

                    $('#station').show();
                });
            });
        })
        .fail(function(jqXHR, textStatus) {
            console.log( "Request failed: " + textStatus );
        });
}

function updateBookingInfo() {
    var bookingJson = sessionStorage.getItem('booking');
    if (bookingJson == null) {
        return false;
    }

    var booking = JSON.parse(bookingJson);

    // Get remaining time
    // 20 min session
    var remainingSeconds = (20 * 60) - ((Date.now() - booking.bookedAt) / 1000);
    // Remaining time is over?
    if (remainingSeconds <= 0) {
        sessionStorage.removeItem('booking');
        $('#booking-info').html('');
        return false;
    }
    var minutes = Math.floor(remainingSeconds / 60);
    var seconds = Math.floor(remainingSeconds % 60);

    var htmlString = '1 vélo réservé à la station "'+booking.station.name+'" pour '+minutes+' min '+seconds+' s';
    $('#booking-info').html(htmlString);
}

// Execute when the DOM is fully loaded
$(function() {
    // Instantiate slider
    var slider = new Slider('slider', 3000);
    // Control slider with keyboard 
    window.addEventListener('keydown', function(event) {
        return slider.controlSliderWithKeyboard(event);
    }, false);

    // Instantiate signature
    var signature = new Signature('signature-canvas', 200, 100);
    // Clear signature
    document.getElementById('signature-clear-button').addEventListener('click', function(event) {
        signature.clear();
    }, false);

    // Update booking info each second
    setInterval(updateBookingInfo, 1000);
});