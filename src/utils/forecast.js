const request = require('postman-request')
require('dotenv').config()
const weather_api_key = process.env.WEATHER_API_KEY


const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${lat},${long}`
    //return callback(url, url)
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.success === false){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees but feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}%.`)
        }
    })
}
module.exports = forecast