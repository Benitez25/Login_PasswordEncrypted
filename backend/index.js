const mongoose = require('mongoose')
const app = require('./app')
const port = 3000

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
//Hacemos la conexion con el mondodb
mongoose.connect('mongodb://localhost:27017/login_farmacia', {useNewUrlParser:true, useUnifiedTopology:true})
    //hacemos una promesa para devolver un mensaje    
    .then(()=>{
        console.log('conectado al connect')
        //hacemos un llamada para mostrar el servidor
        app.listen(port, ()=>{
            console.log('conectado al listen')
        })
    })