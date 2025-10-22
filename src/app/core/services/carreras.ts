import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';


export interface Carrera {
  id?: number,
  carreNombre: string,
  created_at: string,
  updated_at: string,
  Materias: Materia[]
}

export interface Materia {
  id?: number,
  matNombre: string,
  carrera_id: number,
  created_at: string,
  updated_at: string,
}

@Injectable({
  providedIn: 'root'
})
export class Carreras {

  private http = inject(HttpClient);

  miCarrera: Carrera = {
    carreNombre: "",
    created_at: "",
    updated_at: "",
    Materias: []
  };


  constructor() { }

  getAllCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${environment.apiURL}carrerasConMaterias`)
  }

  setMiCarrera(carrera: Carrera): void {
    this.miCarrera = carrera;
  }

  getMiCarrera(): Carrera {
    return this.miCarrera;
  }
}