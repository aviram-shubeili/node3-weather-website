
const request = require('request')

const connectivityErrorMessage = 'Unable to connect to weather service!'
const notFoundErrorMessage = 'Unable to find location!'

const forecast = (units, latitude, longitude, callback) => {
    const unitsQuery = 'units='.concat(units)
    const url = 'http://api.weatherstack.com/current?access_key=5d5e0feb0c341c74709b161d1b532e69&query=' + latitude + ',' + longitude + '&' + unitsQuery
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            console.log('ERROR [forecast]: ', connectivityErrorMessage)
            callback(connectivityErrorMessage, undefined)
        } else if (body.error) {
            console.log('ERROR [forecast]: ', notFoundErrorMessage)
            callback(notFoundErrorMessage, undefined)
        } else {
            const {temperature: temp, feelslike, weather_descriptions } = body.current
   
            callback(undefined,
                    weather_descriptions[0] + '. It is ' + temp + ' degrees('+ units +') outside and it feels like ' + feelslike + ' degrees('+ units +') out.'
            )
        }
    })
}


module.exports = forecast