// src/app/core/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}login`, { email, password }).pipe(
      tap((response) => {
        if (response.user && !response.user.userAceptado) {
          throw new Error('Tu solicitud está pendiente.');
        }
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          const fullName = `${response.user.userApellido}, ${response.user.userNombre}`;
          localStorage.setItem('userName', fullName);
        }
        if (response.rol) {
          localStorage.setItem('rol', response.rol);
        }
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}register`, user).pipe(
      tap((response) => {
        if (response.token) localStorage.setItem('token', response.token);
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          const fullName = `${response.user.userApellido}, ${response.user.userNombre}`;
          localStorage.setItem('userName', fullName);
        }
        if (response.rol) localStorage.setItem('rol', response.rol);
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      this.clearAuthData();
      return of(null);
    }

    return this.http.post(`${environment.apiURL}logout`, {}).pipe(
      tap(() => this.clearAuthData()),
      catchError((err) => {
        console.error('Error en logout:', err);
        this.clearAuthData();
        return of(null);
      })
    );
  }

  clearAuthData(): void {
    ['token', 'user', 'userName', 'rol'].forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): string {
    return localStorage.getItem('rol') || '';
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserName(): string {
    return localStorage.getItem('userName') || '';
  }

  hasRole(role: string): boolean {
    return this.getRol() === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getRol();
    return roles.includes(userRole);
  }

  isEstudiante(): boolean {
    return this.hasRole('estudiante');
  }

  isProfesor(): boolean {
    return this.hasRole('profesor');
  }

  isAdministrador(): boolean {
    return this.hasRole('administrador');
  }
}