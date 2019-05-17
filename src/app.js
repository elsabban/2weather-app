const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const expressip = require('express-ip');
var getIP = require('ipware')().get_ip;






const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

const port = process.env.PORT || 3000
app.use(expressip().getIpInfoMiddleware);



app.use(express.static(publicPath))
app.set('view engine','hbs')
app.set('views',viewPath)

hbs.registerPartials(partialsPath)


app.get('',(req,res) => {
    res.render('index',{
        title:'weather home page dynamic',
        name:'elsabboo',
        head:'weather forecast'
    })
})

app.get('/about',(req,res) => {
    // const ipInfo = req.ipInfo;
    // console.log(ipInfo)
    
    
    res.render('about',{
        title:'about page dynamic',
        name:'elsabbo',
        head:ipInfo.city
    })
})

app.get('/helps',(req,res) => {
    res.render('helps',{
        title:'help page',
        name:'help content generator',
        titleee:'help page'
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address) {
        return res.send({error:'you must enter location'})
    }
    
        geocode(req.query.address,(error,{latitude,langitude,location} ={}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude,langitude,(error,dataf) => {
                 if (error) {
                     return res.send({error})
                 }
                     res.send({
                          location,
                          weather:dataf,
                          address:req.query.address
                     })
                 
            })
        })
    
})





app.get('/help/*',(req,res) => {
    res.send('404',{
        errorx:'help article not found',
    })
})

app.get('/*',(req,res) => {
    res.render('404',{
        errorx:'page not found',
    })
})

app.listen(port ,() => {
    console.log('server is up and running')
}) 