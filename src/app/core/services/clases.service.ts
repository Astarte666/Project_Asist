import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs";


@Injectable({
    providedIn: "root",
})

export class ClasesService{

private apiUrl = `${environment.apiURL}clases`;

constructor (private http: HttpClient) {}

private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token || ''}`
    });
  }

  // Obtener la lista completa de clases
  getClases(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en ClasesService:', error);
    return throwError(() => new Error('Algo salió mal al obtener las clases; por favor, intenta de nuevo.'));
  }


    
}