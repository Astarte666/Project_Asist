import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class GestionService {
  private api = `${environment.apiURL}gestion`;

  constructor(private http: HttpClient) {}

  getPendientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/usuarios-pendientes`);
  }

  aceptarUsuario(id: number): Observable<any> {
    return this.http.post(`${this.api}/usuarios/${id}/aceptar`, {});
  }
}