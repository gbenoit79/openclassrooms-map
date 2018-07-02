/**
 * Station manager
 */

// Constructor
function StationManager(apiUrl, apiKey) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
}

// Get stations
StationManager.prototype.getStations = function(contract, doneCallback) {
    $.ajax({
        url: this.apiUrl+'stations',
        data: {
            contract: contract, 
            apiKey: this.apiKey
        }
    })
        .done(doneCallback)
        .fail(function(jqXHR, textStatus) {
            console.log("Request failed: "+textStatus);
        });
}