const request = require('request')

const geocode = (address,callback) => {
      
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZWxzYWJiYW4iLCJhIjoiY2p2NWxhYnVzMTN0aDQzbzdoZDE3aG5qdiJ9.cCUPcyl6OFYBfDzNImc7NQ`
    
    request({url,json:true},(error,{body}) => {
        if (error) {
            callback('there is no connection',undefined)
        }else if(body.features.length === 0) {
            callback('enter a valid location',undefined)
        }else {
            callback(undefined,{
                location:body.features[0].place_name,
                langitude:body.features[0].center[0],
                latitude:body.features[0].center[1]

            })
        }
    })
}

module.exports = geocode






