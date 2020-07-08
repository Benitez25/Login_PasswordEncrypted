const mongoose = require('mongoose')
const schema = mongoose.Schema
//hacemos nuestro modelo de la base de datos
const schemaUser = schema({
    username:String,
    password:String
})

module.exports = mongoose.model('User', schemaUser)