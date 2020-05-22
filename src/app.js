const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Local Requires
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Static 
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

// Template Engine
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Pettit'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Pettit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        message: 'This is a different help message',
        name: 'Andrew Pettit'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "No input specified" })
    }
    const coords = geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
    
})

// Error Codes
app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: '404 Error',
        message: 'Article not found',
        name: 'Andrew Pettit'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404 Error',
        message: 'Page not found',
        name: 'Andrew Pettit'
    })
})

// Listen

app.listen(port, () => console.log(`App listening on port ${port}`))


// 1. Create html page for about
// 2. Crate html page for help
// 3. remove old routers
// 4. test