import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environments";

@Injectable({
  providedIn: "root",
})
export class AsistenciaService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  prepararTomarAsistencia(claseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}asistencias/clase/${claseId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  guardarAsistencias(claseId: number, asistencias: any[]): Observable<any> {
    const body = { asistencias };  
    return this.http.post<any>(`${this.apiUrl}asistencias/clase/${claseId}`, body, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAsistencias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}asistencias`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getEstadisticasAlumno(userId: number, materiaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}asistencias/estadisticas/${userId}/${materiaId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateAsistencia(asistenciaId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}asistencias/${asistenciaId}`, data, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteAsistencia(asistenciaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}asistencias/${asistenciaId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  //estadisiticas generales
  // asistencia.service.ts - Agregar estos métodos

getEstadisticasGenerales(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}asistencias/estadisticas-generales/${userId}`, {
    headers: this.getHeaders()
  }).pipe(
    catchError(this.handleError)
  );
}

getEstadisticasMateria(materiaId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}asistencias/estadisticas-materia/${materiaId}`, {
    headers: this.getHeaders()
  }).pipe(
    catchError(this.handleError)
  );
}

  private handleError = (error: any) => {
    console.error('AsistenciaService error', error);
    return throwError(() => new Error(error?.message || 'Server error'));
  };
}