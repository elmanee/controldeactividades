import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ActividadesFormComponent } from './components/actividades-form/actividades-form.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http'

import { ActividadesService  } from './services/actividades.service';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './auth/register/register.component';
import { ListaActividadesComponent } from './components/lista-actividades/lista-actividades.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActividadesComponent,
    ActividadesFormComponent,
    HomeComponent,
    ListaActividadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    ActividadesService,
    provideHttpClient(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
