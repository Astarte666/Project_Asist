import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GestionService } from '../../core/services/gestion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrerasService, Carrera } from '../../core/services/carreras';



interface Estudiante {
  id: number;
  nombre_completo: string;
  documento: string;
  carrera: string;
  materias: string[];
}

@Component({
  selector: 'app-preceptor',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './preceptor.html',
  styleUrls: ['./preceptor.css']
})
export class Preceptor implements OnInit {

  usuariosPendientes: any[] = [];
  cargando = true;
  aceptando: number[] = [];

  carreras: Carrera[] = [];
  estudiantes: Estudiante[] = [];
  carreraSeleccionada: number | null = null;
  loading: boolean = false;
  loadingEstudiantes: boolean = false;
  error: string | null = null;



  constructor(private gestionService: GestionService, private carrerasService: CarrerasService) {}

  ngOnInit(): void {
    this.cargarPendientes();
    this.cargarCarreras();
  }

  //Solicitudes pendientes
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
      },
      error: (err) => {
        this.aceptando = this.aceptando.filter(x => x !== id);
        alert(err.error?.message || 'Error al aceptar');
      }
    });
  }

  cargarCarreras(): void {
    this.loading = true;
    this.error = null;

    this.carrerasService.getAllCarreras().subscribe({
      next: (response) => {
        if (response.success) {
          this.carreras = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar carreras:', error);
        this.error = 'Error al cargar las carreras';
        this.loading = false;
      }
    });
  }

  onCarreraChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const carreraId = target.value;

    if (!carreraId || carreraId === '') {
      this.estudiantes = [];
      this.carreraSeleccionada = null;
      return;
    }

    this.carreraSeleccionada = parseInt(carreraId);
    this.cargarEstudiantes(this.carreraSeleccionada);
  }

  cargarEstudiantes(carreraId: number): void {
    this.loadingEstudiantes = true;
    this.error = null;
    this.estudiantes = [];

    this.carrerasService.getEstudiantesInscriptos(carreraId).subscribe({
      next: (response) => {
        if (response.success) {
          this.estudiantes = response.data;
        } else {
          this.error = response.message || 'No se encontraron estudiantes';
        }
        this.loadingEstudiantes = false;
      },
      error: (error) => {
        console.error('Error al cargar estudiantes:', error);
        this.error = error.error?.message || 'Error al cargar los estudiantes';
        this.loadingEstudiantes = false;
      }
    });
  }


  getNombreCarreraSeleccionada(): string {
    if (!this.carreraSeleccionada) return '';
    const carrera = this.carreras.find(c => c.id === this.carreraSeleccionada);
    return carrera ? carrera.carreNombre : '';
  }

  refrescar(): void {
    if (this.carreraSeleccionada) {
      this.cargarEstudiantes(this.carreraSeleccionada);
    }
  }

}
