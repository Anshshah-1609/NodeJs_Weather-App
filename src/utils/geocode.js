const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5zaHNoYWgxNiIsImEiOiJja3poejUxb3AxZ21hMnZvY2tlNXJvNXo0In0.C3_HP7qlbNZngu_z6k_h1A'
    
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Enable to connect Weather Services!", undefined)
        }
        else if (response.body.features.length === 0) {
            callback("Enable to Find API Location!",undefined)
        }
        else {
            callback(undefined, {
                place: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            })
        }
    })
}
module.exports = geocode
