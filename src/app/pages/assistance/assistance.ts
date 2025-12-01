import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrerasService, Carrera } from '../../core/services/carreras';
import { ClasesService } from '../../core/services/clases.service';
import { UserService } from '../../core/services/user';
import { UserInscripcionService } from '../../core/services/user-inscripcion.service';
import { AsistenciaService } from '../../core/services/asistencia.service';


@Component({
  selector: 'app-assistance',
  imports: [CommonModule, FormsModule],
  templateUrl: './assistance.html',
  styleUrl: './assistance.css',
  standalone: true,
})
export class Assistance {

/*   estudiantes = [
  { nombre: 'Juan', asistencia: 'presente' },
  { nombre: 'Pepito', asistencia: 'ausente' },
  { nombre: 'Pedro Sanchez', asistencia: 'justificado' }
]; */

  estudiantes = [];
  carreras: any[] = [];
  clases: any[] = [];  
  clasesFiltradas: any[] = [];  
  inscripciones: any[] = [];  
  alumnosFiltrados: any[] = [];  
  carreraSeleccionada?: any;
  selectedClaseId?: number | null = null; 
  cargando: boolean = false;

  constructor(
    private carrerasService: CarrerasService, 
    private clasesService: ClasesService,
    private userInscripcionService: UserInscripcionService 
  ) {}

  ngOnInit(): void {
    this.obtenerCarreras();
    this.obtenerClases();  
    this.obtenerInscripciones();  
  }

  obtenerCarreras(): void {
    this.cargando = true;
    this.carrerasService.getAllCarreras().subscribe({
      next: (response) => {
        this.carreras = response?.data || [];
        console.log('Carreras cargadas:', this.carreras);
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener las carreras:', error);
        this.cargando = false;
      }
    });
  }

  obtenerClases(): void {
    this.clasesService.getClases().subscribe({
      next: (response) => {
        this.clases = response?.data || [];
        console.log('Todas las clases cargadas:', this.clases);
      },
      error: (error) => {
        console.error('Error al obtener las clases:', error);
      }
    });
  }

  obtenerInscripciones(): void {
    this.userInscripcionService.userCarrerasMaterias().subscribe({
      next: (response) => {
        this.inscripciones = response?.data || []; 
        console.log('Inscripciones/alumnos cargados:', this.inscripciones);
      },
      error: (error) => {
        console.error('Error al obtener inscripciones:', error);
      }
    });
  }

  onCarreraSeleccionada(id?: number): void {
    if (!id) {
      console.log('Carrera deseleccionada');
      this.clasesFiltradas = [];
      this.alumnosFiltrados = [];
      return;
    }
    this.clasesFiltradas = this.clases.filter(clase => clase.materia?.carrera_id === id);
    console.log('Clases filtradas para carrera ' + id + ':', this.clasesFiltradas);
    this.alumnosFiltrados = [];
    this.selectedClaseId = null;  
  }

  onClaseSeleccionada(): void {
    if (!this.selectedClaseId) {
      console.log('Clase deseleccionada');
      this.alumnosFiltrados = [];
      return;
    }
    const claseSeleccionada = this.clasesFiltradas.find(clase => clase.id === this.selectedClaseId);
    this.alumnosFiltrados = this.inscripciones.filter(inc => inc.clase_id === this.selectedClaseId || inc.materia_id === claseSeleccionada?.materia_id);  // Ajusta según tu data structure
    console.log('Alumnos filtrados para clase ' + this.selectedClaseId + ':', this.alumnosFiltrados);
    this.alumnosFiltrados = this.alumnosFiltrados.map(alumno => ({
      ...alumno,
      presente: true,  
      observacion: ''  
    }));
  }

}//end



