import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environments";

@Injectable({
  providedIn: "root",
})
export class AsistenciaService{
  private apiUrl = environment.apiURL + "asistencias";

constructor(private http: HttpClient) {}

private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

    guardarAsistencia(claseId: number, asistencias: any[]): Observable<any> {
    const body = { asistencias };  
    return this.http.post<any>(`${this.apiUrl}/asistencias/clase/${claseId}`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError = (error: any) => {
    console.error('AsistenciaService error', error);
    return throwError(() => new Error(error?.message || 'Server error'));
  }

}