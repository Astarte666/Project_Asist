import { Component, OnInit } from '@angular/core';
import { GestionService } from '../../../core/services/gestion.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { CarrerasService, Carrera, Materia } from '../../../core/services/carreras';
import { ClasesService } from '../../../core/services/clases.service';

export interface Clase {
  id: number;
  fecha: string;
  materias_id: number;
  materia: Materia;
}
@Component({
  selector: 'app-gestion',
  imports: [CommonModule, RouterLink],
  templateUrl: './gestion.html',
  styleUrl: './gestion.css'
})
export class Gestion implements OnInit {

  usuariosPendientes: any[] = [];
  cargando = true;
  aceptando: number[] = [];
  carreras: Carrera[] = [];
  materias: Materia[] = [];
  carrerasConMaterias: Carrera[] = [];
  materiasPlanas: { matNombre: string; carrera: string }[] = [];
  clases: Clase[] = [];


  constructor(private gestionService: GestionService, private carrerasService: CarrerasService, private clasesService: ClasesService) {}

  ngOnInit(): void {
    this.cargarPendientes();
    this.obtenerCarreras();
    this.obtenerMaterias();
    this.obtenerClases()
  }

  cargarPendientes(): void {
    this.cargando = true;
    this.gestionService.getPendientes().subscribe({
      next: (data) => {
        this.usuariosPendientes = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        alert('Error al cargar solicitudes');
      }
    });
  }

  aceptar(id: number): void {
    this.aceptando = [...this.aceptando, id];
    this.gestionService.aceptarUsuario(id).subscribe({
      next: () => {
        this.usuariosPendientes = this.usuariosPendientes.filter(u => u.id !== id);
        this.aceptando = this.aceptando.filter(x => x !== id);
        alert('Usuario aceptado con éxito');
      },
      error: (err) => {
        this.aceptando = this.aceptando.filter(x => x !== id);
        alert(err.error?.message || 'Error al aceptar');
      }
    });
  }

  obtenerCarreras(): void {
    this.carrerasService.getAllCarreras().subscribe({
      next: (response) => {
        this.carreras = response?.data || [];
      },
      error: (error) => {
        console.error('Error al cargar carreras:', error);
        alert('Error al cargar carreras');
      }
    });
  }

obtenerMaterias(): void {
  this.carrerasService.getMateriasConCarreras().subscribe({
    next: (response) => {
      const carreras = response.data;

      this.materiasPlanas = carreras.flatMap(carrera =>
        carrera.materias.map(materia => ({
          matNombre: materia.matNombre,
          carrera: carrera.carreNombre
        }))
      );

      console.log('Materias planas:', this.materiasPlanas);
    },
    error: (error) => {
      console.error('Error al cargar materias:', error);
    }
  });
}

obtenerClases(): void {
  this.clasesService.getClases().subscribe({
    next: (response) => {
      console.log('Clases asignadas:', response.data);
      this.clases = response.data; 
    },
    error: (error) => {
      console.error('Error al cargar clases:', error);
    }
  });
}




}
