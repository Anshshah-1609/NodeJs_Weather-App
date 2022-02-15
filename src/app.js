const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000
// importing geocode.js & froecast.js from utils
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define file Paths for express config
const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// set up static directory to serve
app.use(express.static(publicPath))

//  Set up handlebars engine
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Ansh Shah',
        degree:'IT Engineer'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Help',
        name:'Ansh Shah',
        degree:'Web Developer',
        message:'This is message from help.hbs file'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Us',
        name:'Ansh Shah',
        degree:'App Designer',
        message:'This is message from about.hbs file'
    })
})
// app.get('/about',(req,res)=>{
//     res.sendFile('about.html', {root:publicPath})
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Please Provide Location!'
        })
    }
    geocode(req.query.address, (error,gdata) => {
        if(error){
            return res.send({
                errorMessage : error 
            })
        }
        forecast(gdata.latitude,gdata.longitude, (error,fdata) => {
            if(error){
                return res.send({
                    errorMessage : error
                })
            }
            res.send({
                location : gdata.place,
                weather: fdata.Description,
                temperature : fdata.Temperature,
                feelslike : fdata.Feelslike,
                rain_probability : fdata.Rain_Probability
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'Error 404',
        errMsg : 'Help Artical Not Found'
    })
})

// if url does not match with any app.get method 
// for error 404
app.get('*',(req,res) => {
    res.render('404',{
        title:'Error 404',
        errMsg : 'Page Not Found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port number '+port+'...')
})