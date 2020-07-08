import { Component, OnInit } from '@angular/core';
import {UserServices} from '../../services/user.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private _UserService: UserServices, private _router:Router) { }

  ngOnInit(): void {
  }

  //creamos la funcion para eliminar nuestro token y la redireccion a nuestro login
    signOf(){
      this._UserService.delete_token()
      this._router.navigate(['/login'])
    }


}
