const request = require('request')
const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6d022e29331cddb5a161cc1910e62cf0&query='+lat+','+long+'&units=m'

    request({url, json:true}, (error,response) => {

        if(error){
            callback("Enable to connect Weather Services!",undefined)
        }
        else if(response.body.error){
            callback("Enable to Find API location!",undefined)
        }
        else{
            callback(undefined, {
                Description : response.body.current.weather_descriptions[0],
                Temperature : response.body.current.temperature,
                Feelslike : response.body.current.feelslike,
                Rain_Probability : response.body.current.precip+" %"
            })
        }
    })
}
module.exports = forecast