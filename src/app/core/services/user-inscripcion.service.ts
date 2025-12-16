import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';



@Injectable({
  providedIn: 'root'
})
export class UserInscripcionService {

  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  userCarrerasMaterias(claseId?: number): Observable<any> {
    let url = `${this.apiUrl}/userCarrerasMaterias`;
    if (claseId) url += `?clase_id=${claseId}`;
    return this.http.get(url);  
  }

  getEstudiantesPorClase(claseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clases/${claseId}/estudiantes`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getInscripcionesUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}mis-inscripciones`, { 
        headers: this.getHeaders()
    }).pipe(
        catchError(this.handleError)
    );
}

  eliminarInscripcionPorMateria(materiaId: number): Observable<any> {
    const url = `${this.apiUrl}desinscribir/${materiaId}`;
    return this.http.delete(url);
  }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => error);
  }
}
