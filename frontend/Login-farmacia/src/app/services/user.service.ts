import  {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {Global} from './global'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {User} from '../models/user'

@Injectable({
    providedIn:'root'
})
export class UserServices{
    user= {}
    public url: string

    constructor( private httpClient: HttpClient ){
        this.url = Global.url
    }

    //hacemos una funcion de ingreso a nuestro sistema
    user_singIn(user):Observable<any>{
        //creamos una variable headers
        var header = new HttpHeaders().set('Content-Type', 'application/json')
        //creamos una variable con los parametros que recogeremos de un formulario
        var params = JSON.stringify(user)
        //retornamos con los valores de nuestra api
        return this.httpClient.post(this.url+'user_singIn', params, {headers:header})
    }

    //hacemos una funcion para guardar nuetros usuarios
    user_save(user: User):Observable<any>{
        //creamos una variable headers
        var header = new HttpHeaders().set('Content-Type', 'application/json')
        //creamos una variable con los parametros que recogeremos de un formulario
        var params = JSON.stringify(user)
        //retornamos con los valores de nuestra api
        return this.httpClient.post(this.url+'user_save', params, {headers:header})
    }

    //hacemos una funcion para validar que existe nuestro token
    validate_token(){
       return !!localStorage.getItem('jtoken')
    }

    //hacemos una funcion para eliminar nuestro token
    delete_token(){
        localStorage.clear()
    }

}