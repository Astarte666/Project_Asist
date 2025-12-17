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
    console.log('Iniciando carga de usuarios pendientes...');
    this.cargando = true;
    this.gestionService.getPendientes().subscribe({
      next: (response) => {
        console.log('Respuesta completa del servidor:', response);
        console.log('Tipo de respuesta:', typeof response);
        console.log('Estructura de respuesta:', Object.keys(response));
                if (Array.isArray(response)) {
          console.log('Respuesta es array directo');
          this.usuariosPendientes = response;
        } else if (response && response.data) {
          console.log('Respuesta tiene propiedad data');
          this.usuariosPendientes = response.data;
        } else if (response && Array.isArray(response)) {
          console.log('Respuesta es objeto con array');
          this.usuariosPendientes = response;
        } else {
          console.warn('Estructura de respuesta inesperada:', response);
          this.usuariosPendientes = [];
        }
        console.log('Total de usuarios pendientes:', this.usuariosPendientes.length);
        console.log('Usuarios pendientes:', this.usuariosPendientes);
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar solicitudes:', error);
        console.error('Error completo:', JSON.stringify(error, null, 2));
        console.error('Status:', error.status);
        console.error('Mensaje:', error.message);
        console.error('Error del servidor:', error.error);
        this.cargando = false;
        alert('Error al cargar solicitudes: ' + (error.error?.message || error.message));
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
