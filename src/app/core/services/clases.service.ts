import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators"; 

@Injectable({
    providedIn: "root",
})
export class ClasesService {
    private apiUrl = `${environment.apiURL}`; 

    constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');  
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token || ''}`
        });
    }

    getClases(): Observable<any> {
        return this.http.get(`${this.apiUrl}clases`, { 
            headers: this.getHeaders() 
        }).pipe(
            catchError(this.handleError)
        );
    }

    getClase(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}clases/${id}`, {
            headers: this.getHeaders()
        }).pipe(
            catchError(this.handleError)
        );
    }

    createClase(data: { materias_id: number, fecha: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}clases`, data, {
            headers: this.getHeaders()
        }).pipe(
            catchError(this.handleError)
        );
    }

    updateClase(id: number, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}clases/${id}`, data, {
            headers: this.getHeaders()
        }).pipe(
            catchError(this.handleError)
        );
    }

    deleteClase(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}clases/${id}`, {
            headers: this.getHeaders()
        }).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any): Observable<never> {
        console.error('Error en ClasesService:', error);
        return throwError(() => new Error('Algo salió mal; por favor, intenta de nuevo.'));
    }
}