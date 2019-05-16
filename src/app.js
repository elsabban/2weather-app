const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

var getIP = require('ipware')().get_ip;



const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    console.log(ipInfo);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});


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
    res.render('about',{
        title:'about page dynamic',
        name:'elsabbo',
        titleee:'about page'
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

app.listen(3000 ,() => {
    console.log('server is up and running')
}) 