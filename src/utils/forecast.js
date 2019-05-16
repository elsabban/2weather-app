const request = require('request')

const forecast = (x,y,callback) => {
    const url =`https://api.darksky.net/forecast/742781d1247701410002f84c9819c4bb/${x},${y}?units=si&lang=en`

    request({url,json:true},(error,{body}) => {
        if (error) {
            callback('there is no connection try agian',undefined)
        }else if(body.error) {
            callback('enter a valid location',undefined)
        }else {
            const data = body.currently
            callback(undefined,body.daily.data[0].summary + ' it is currently ' + data.temperature + ' degrees out. ' + 'there is a ' + data.precipProbability + '% to rain')
        }
    })

}
module.exports = forecast


