import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {Actividad} from '../models/actividad'

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getActividades(){
    return this.http.get(`${this.API_URI}/actividades`)
  }

  getActividad(id:string){
    return this.http.get(`${this.API_URI}/actividades/${id}`)
  }

  saveActividad(activiad:Actividad){
    return this.http.post(`${this.API_URI}/actividades`, activiad)
  }

  deleteActividad(id:string){
    return this.http.delete(`${this.API_URI}/actividades/${id}`)
  }

  updateActividad(id : string | number , updateActividad: Actividad){
    return this.http.put(`${this.API_URI}/actividades/${id}`, updateActividad)
  }
}
