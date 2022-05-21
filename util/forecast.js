const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&appid=0ae3eae4a4b35e8688a522d2c17f4532&units=metric';

    request({url:url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service',undefined);
        } else if (response.body.message) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,'It is currently '+response.body.main.temp+ ' degree out. And there are '+ response.body.weather[0].description);
        }
    })

}
module.exports = forecast;