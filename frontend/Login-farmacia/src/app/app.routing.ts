import {ModuleWithProviders} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {GuardGuard} from './guard.guard'

import {LoginComponent} from './components/login/login.component'
import {InicioComponent} from './components/inicio/inicio.component'
import {ErrorComponent} from './components/error/error.component'
import {RegisterComponent} from './components/register/register.component'


var router:Routes = [
    {path:'', redirectTo:'/inicio', pathMatch:'full' },
    {path:'login', component:LoginComponent},
    {path:'inicio', component:InicioComponent, canActivate:[GuardGuard]},
    {path:'registrar', component:RegisterComponent},
    {path:'**', component:ErrorComponent}
]

export const RouterProvider : any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(router)