import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        console.log(response);
        if (response && response.token && response.user_id) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response.user_id.toString());
          console.log("Token recibido en Angular:", response.token);
          console.log("Usuario recibido:", response.user.name);
          console.log("Email recibido:", response.user.email);
        }
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }




}
