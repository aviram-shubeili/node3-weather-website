const request = require('request')

const connectivityErrorMessage = 'Unable to connect to location service!'
const notFoundErrorMessage = 'Unable to find location, try again with different search term.'

const geocode = (address, callback) => {

    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXZpcmFtLXNodWJlaWxpIiwiYSI6ImNsNmV4aHIyOTBqb20zZ214ZWhvb25wZjEifQ.DJUrhM9AyfA8m1sXZpPhnQ&limit=1'
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            console.log('ERROR [geocode]: ', connectivityErrorMessage)
            callback(connectivityErrorMessage)
        } else if (body.features.length === 0) {
            console.log('ERROR [geocode]: ', notFoundErrorMessage)
            callback(notFoundErrorMessage, undefined)
        } else {
            const {place_name, center} = body.features[0]
            callback(undefined, {
                    location: place_name,
                    latitude: center[0],
                    longitude: center[1]
            })
            
        }
})
}

module.exports = geocode
