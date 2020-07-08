const express = require('express')
const bodyparse = require('body-parser')
const router = require('./routers/router')

const app = express()

//middleware
app.use(bodyparse.json())
app.use(bodyparse.urlencoded({extended:false}))

//configuramos las peticiones
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//configuramos las rutas
app.use('/api',router)



module.exports = app