import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ActividadesFormComponent } from './components/actividades-form/actividades-form.component';
import { HomeComponent } from './components/home/home.component';
import { ListaActividadesComponent } from './components/lista-actividades/lista-actividades.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'actividades', component: ActividadesComponent, canActivate: [AuthGuard] },
  { path: 'lista-actividades', component: ListaActividadesComponent, canActivate: [AuthGuard]},
  { path: 'actividades/add', component: ActividadesFormComponent, canActivate: [AuthGuard] },
  { path: 'actividades/edit/:id', component: ActividadesFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
