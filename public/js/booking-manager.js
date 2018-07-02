/**
 * Booking manager
 */

// Constructor
function BookingManager() {

}

// Delete booking
BookingManager.prototype.deleteBooking = function() {
    sessionStorage.removeItem('booking');
}

// Get booking
BookingManager.prototype.getBooking = function() {
    var bookingJson = sessionStorage.getItem('booking');
    if (bookingJson == null) {
        return false;
    }

    return JSON.parse(bookingJson);
}

// Save booking
BookingManager.prototype.saveBooking = function(booking) {
    sessionStorage.setItem('booking', JSON.stringify(booking));
}