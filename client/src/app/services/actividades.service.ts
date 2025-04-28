import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getActividades(): Observable<any> {
    return this.http.get(`${this.API_URI}/actividades`);
  }

  getActividad(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/actividades/${id}`);
  }

  deleteActividad(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/actividades/${id}`);
  }

  saveActividad(actividad: any): Observable<any> {
    return this.http.post(`${this.API_URI}/actividades`, actividad);
  }

  updateActividad(id: string, updatedActividad: any): Observable<any> {
    return this.http.put(`${this.API_URI}/actividades/${id}`, updatedActividad);
  }

  // Métodos nuevos para obtener actividades por estado
  getActividadesPorEstado(estado: string): Observable<any> {
    return this.http.get(`${this.API_URI}/actividades/estado/${estado}`);
  }

  // Método para cambiar el estado de una actividad
  cambiarEstado(id: string, estado: string): Observable<any> {
    return this.http.patch(`${this.API_URI}/actividades/${id}/estado`, { estado });
  }
}
