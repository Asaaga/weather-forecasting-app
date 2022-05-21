const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./util/geocode');
const forecast = require('./util/forecast');
const app = express(); 
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.get('/', (req, res, next) => {
    res.render('index');
})
app.get('/weather', (req, res, next) => {
    
    if (!req.query.address) {
        return res.send({
            error:'provide an address to see location'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
           return res.send({ error });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
             res.send({
                 forecast: forecastData,
                 location:data.location,
                 address: req.query.address
             })
        })
    })
    
})

app.get('*', (req, res, next) => {
    res.send('<h4>404 Page</h4>');
})

app.listen(3000, () => {
    console.log('app listening on port 3000')
}) 