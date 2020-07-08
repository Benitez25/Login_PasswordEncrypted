import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {UserServices} from './services/user.service'
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private _userService: UserServices, private _Router:Router){
  }
  //validamos que exista un token en LocalStorage
  canActivate():boolean{
    //devolvemos un 'true' en caso exista un dato
    if(this._userService.validate_token()){
      return true
    }
    //en caso de ser falso nos retorna a nuestro login
    this._Router.navigate(['/login'])
    return false
  }
  
}
