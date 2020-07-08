import { Component, OnInit } from '@angular/core';
import {Router} from  '@angular/router'
import {UserServices} from '../../services/user.service'
import {User} from '../../models/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserServices]
})
export class RegisterComponent implements OnInit {
  //hacemos que nuestro vista de mensaje este oculta
  public view: Boolean = true 
  //creamos una variable nueva con un nuevo usuario
  public user: User
  //hacemos una variable con el mensaje para nuestro view
  public result: String

  constructor(private _UserServices: UserServices, private _prouter:Router) {
    //le damos datos a nuestro usuario creado con valores vacios
    this.user = new User("","")
   }
  ngOnInit(): void {
  }

  //creamos la funcion de guardar usuario
  save(){
    //llamamos a nuestro servicio de guardar usuario y le enviamos nuestro usuario escrito en el html 
    this._UserServices.user_save(this.user).subscribe(save=>{
      //confirmamos si es valido
      if(save){
        //una ves registrado mostramos el mensaje
        this.result= 'Usuario registrado'
        this.view = false
        //son esta funcion hacemos que esto se elimine y nos envie a la pagina login
      }setTimeout(()=>{
        this._prouter.navigate(['/login'])
      },2000)
    },
    //en caso de existir error, nos muestra un error con la misma funcion de SetTimeout
    error=>{
      if(error){
      this.result = error.error.mensaje
      this.view = false
      }setTimeout(()=>{
        this.view = true
      },2000)
    })
  }

}
