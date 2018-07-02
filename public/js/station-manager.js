/**
 * Station manager object
 */

// StationManager constructor
function StationManager(apiUrl, apiKey) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
}

// getStations method of StationManager object
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