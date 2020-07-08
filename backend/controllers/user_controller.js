const User  = require('../models/user')
const jwtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const user_controller = {
    //Funcion para guardar usuario
    user_save: function(req, res, next){
        //creamos un nuevo usuario
        var user = new User()
        //agregamos el nombre de usuario a una variable
        let username = req.body.username
        //agregamos la contraseña a una variable
        let pass = req.body.password
        //comprobamos que que este usuario no exista dentro de nuestr base de datos
        User.find({username:username}, (err, result)=>{
            //de estar vacio esta validacion entonces efectua el IF
            if(!result.length){
                //agregamos la variable usuario a nuestro usuario creado
                user.username = username
                //creamos el tamaño de saltos que va a tener nuestra encriptacion
                bcrypt.genSalt(10).then(jumps=>{
                    //indicamos que quien va a ser encriptador, primero la variable pass y la cantidad de saltos
                    bcrypt.hash(pass, jumps).then(hash =>{
                        //luego le agregamos el nuevo valor ya encriptado a esa variable
                        pass = hash
                        //agregamos la variable contraseña ya encriptada a nuestro usuario creado
                        user.password = pass
                        //guardamos en la base de datos
                        user.save((err, user)=>{
                            //verificamos que tenga comunicacion
                            if(err) return res.status(500).send({error:'no existe comunicacion'})
                            //verificamos que conecte al servidor
                            if(!user) return res.status(404).send({error:'error con el servidor'})
                            //guardamos y nos retorna con el json de nuestro usuario
                            return res.status(200).send(user)
                        })
                        //en caso de error con la encriptacion salta este error
                    }).catch(err  => next(err))
                 //en caso de error al generar los saltos, envia este error
                }).catch(err  => next(err))
            //de haber este usuario ya existente en nuestra base de datos, saltara un error 500
            }else{
                return res.status(500).send({mensaje:'No disponible el nombre de usuario'})
            }
        })           
    },

    //Hacemos que nuestra funcion sea asincrono
    user_singIn: async function(req, res){
        //en una constante recogemos del body el usuario y el password
        const {username, pass} = req.body
        //como usamos una funcion async podemos usar un await para esperar una promesa
        //usamos finOne para buscar un objeto y lo guardamos en una constante users
        const validate_user = await User.findOne({username})
        //Validamos que no exista usuario
        if (!validate_user) return res.status(401).send({resultado: 'el usuario no existe'})
        //comparamos la contraseña ingresada con la encriptada y de esto nos mostrara un error o un resultado
        bcrypt.compare(pass, validate_user.password, (error, result)=>{
            //Validamos algun error dentro de la validacion de contraseña
            if(error) return res.satus(500).send({resultado:'error'})
            //Validamos que no la contraseña sea incorrecta
            if(!result) return res.status(401).send({resultado:'contraseña incorrecta'})
            //Validamos que este resultado sea verdadero
            if(result){
                //creamos la variable con el token y conectamos con el id del usuario y le ponemos el nombre de jtoken
                const token = jwtoken.sign({_id:validate_user._id}, 'jtoken')
                //enviamos el mensaje con el jwtoken
                return res.status(200).json({token})
            }
        })
    },
 
}

module.exports = user_controller
