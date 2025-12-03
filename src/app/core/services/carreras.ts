import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

export interface Carrera {
  id?: number;
  carreNombre: string;
  created_at: string;
  updated_at: string;
  Materias: Materia[];
}

export interface Materia {
  id?: number;
  matNombre: string;
  carrera_id: number;
  created_at: string;
  updated_at: string;
}

export interface CarrerasResponse {
  data: Carrera[];
}

export interface MateriasResponse {
  data: Materia[];
}

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private http = inject(HttpClient);
  private miCarrera: Carrera = {
    carreNombre: "",
    created_at: "",
    updated_at: "",
    Materias: []
  };

  constructor() {}

  getAllCarreras(): Observable<CarrerasResponse> {
    return this.http.get<CarrerasResponse>(`${environment.apiURL}carreras`);
  }

  getAllMaterias(): Observable<MateriasResponse> {
    return this.http.get<MateriasResponse>(`${environment.apiURL}materias`);
  }

  getMateriasByCarrera(idCarrera: number): Observable<MateriasResponse> {
    return this.http.get<MateriasResponse>(`${environment.apiURL}carreras/${idCarrera}/materias`);
  }

  setMiCarrera(carrera: Carrera): void {
    this.miCarrera = carrera;
  }

  getMiCarrera(): Carrera {
    return this.miCarrera;
  }

  createCarrera(data: any): Observable<any> {
    return this.http.post(`${environment.apiURL}carreras`, data);
  }

  crearMateria(data: any): Observable<any> {
    return this.http.post(`${environment.apiURL}materias`, data);
  }



}