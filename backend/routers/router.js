const user_controller = require('../controllers/user_controller')

const express = require('express')
const router = express.Router()
//configuramos nuestras rutas
router.post('/user_save', user_controller.user_save)
router.post('/user_singIn', user_controller.user_singIn)

module.exports = router