import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {UserServices} from '../../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserServices]
})
export class LoginComponent implements OnInit {
  //hacemos una variable con el mensaje para nuestro view
  public mensaje:String
  //hacemos que nuestro vista de mensaje este oculta
  public view: Boolean = true
  //creamos una variable con datos en json para asignarlo en el html
  user ={'username': '','pass': ''}

  constructor(private _Userservice: UserServices, private _router:Router) { }

  ngOnInit(): void {
    
  }

  //creamos nuestra funcion de ingreso
  In(){
    //llamamos  nuestro servicio con la api de ingresar al sistema
    this._Userservice.user_singIn(this.user).subscribe(user=>{
      //de ser verdad esta funcion, guardamos en el LocalStorage el token que nos envia como respuesta
      localStorage.setItem('jtoken', user.token)
      //enviamos a la pagina de inicio
      this._router.navigate(['/inicio'])
    },
    //de existir error envia un mensaje de error con la funcion setTimeout
    error=>{
      this.view = false
      this.mensaje = error.error.resultado
      setTimeout(()=>{
        this.view = true
      }, 3000)
      
    })
  }

}
