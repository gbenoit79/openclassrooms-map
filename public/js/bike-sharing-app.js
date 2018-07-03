/**
 * Bike sharing application
 */

var bikeSharingApp = {
    apiUrl: 'https://api.jcdecaux.com/vls/v1/',
    apiKey: '4046fd4b9fc4bb3fa4ef3f3c67efb9e2bbb41c25',
    bookingManager: null,
    map: null,
    stationManager: null,

    // Display markers
    displayMarkers: function(msg) {
        $.each(msg, function(key, station) {
            var marker = new google.maps.Marker({
                position: station.position,
                title: station.address,
                map: this.map
            });
            marker.addListener('click', function() {
                $('#station').hide();
                $('#book-button').hide();
                $('#signature').hide();

                // Check if it is already booked
                var booking = bikeSharingApp.getBookingManager().getBooking();
                if (!booking) {
                    var isAlreadyBooked = false;
                } else {
                    var isAlreadyBooked = (booking.station.number == station.number);
                }

                // Calculate available bikes
                var available_bikes = station.available_bikes;
                if (isAlreadyBooked) {
                    // Decrement available bikes
                    available_bikes = (station.available_bikes > 0) ? station.available_bikes - 1 : 0;
                }

                // Display station infos
                var htmlString = 'Adresse: '+station.address+'<br /><br />';
                htmlString += station.bike_stands+' places<br />';
                htmlString += available_bikes+' vélos disponibles<br />';
                $('#station-info').html(htmlString);

                // Handle booking action
                if (isAlreadyBooked) {
                    $('#book-button').html('Déjà réservé');
                    $('#book-button').prop('disabled', true);
                    $('#book-button').show();
                } else if (available_bikes > 0) {
                    $('#book-button').html('Réserver');
                    $('#book-button').prop('disabled', false);
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
                            bikeSharingApp.getBookingManager().saveBooking(booking);
                            $('#station').hide();
                        });
                    });
                }

                $('#station').show();
            });
        }.bind(this));
    },

    // Get booking manager
    getBookingManager: function() {
        if (this.bookingManager == null) {
            this.bookingManager = new BookingManager();
        }

        return this.bookingManager;
    },

    // Get station manager
    getStationManager: function() {
        if (this.stationManager == null) {
            this.stationManager = new StationManager(this.apiUrl, this.apiKey);
        }
        
        return this.stationManager;
    },

    // Init map
    initMap: function() {
        // Get map
        var lyonPosition = {lat: 45.75, lng: 4.85};
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: lyonPosition
        });

        // Get stations
        this.getStationManager().getStations('Lyon', this.displayMarkers.bind(this));
    },

    // Run
    run: function() {
        // Instantiate slider
        var slider = new Slider('slider', 10000);
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
        setInterval(this.updateBookingInfo.bind(this), 1000);
    },

    // Update booking info
    updateBookingInfo: function() {
        // Get booking
        var booking = this.getBookingManager().getBooking();
        if (!booking) {
            return false;
        }
    
        // Get remaining time
        // 20 min session
        var remainingSeconds = (20 * 60) - ((Date.now() - booking.bookedAt) / 1000);
        // Remaining time is over?
        if (remainingSeconds <= 0) {
            this.getBookingManager().deleteBooking();
            $('#booking-info').html('');
            return false;
        }
        var minutes = Math.floor(remainingSeconds / 60);
        var seconds = Math.floor(remainingSeconds % 60);
    
        var htmlString = '1 vélo réservé à la station "'+booking.station.name+'" pour '+minutes+' min '+seconds+' s';
        $('#booking-info').html(htmlString);
    }
};