const request = require('postman-request')
const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bdcf1ff3dc37b253af26c1ef878a131b&query=${lat},${long}`
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.success === false){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees`)
        }
    })
}
module.exports = forecast