import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrerasService, Carrera, Materia } from '../../core/services/carreras';
import { ClasesService } from '../../core/services/clases.service';
import { AsistenciaService } from '../../core/services/asistencia.service';

interface Alumno {
  id: number;
  userNombre: string;
  userApellido: string;
  userDocumento: string;
  nombre_completo: string;
  condicion: 'presente' | 'ausente' | 'justificado';
  observacion: string;
}

interface Clase {
  id: number;
  fecha: string;
  materias_id: number;
  materia?: Materia;
}

@Component({
  selector: 'app-assistance',
  imports: [CommonModule, FormsModule],
  templateUrl: './assistance.html',
  styleUrl: './assistance.css',
  standalone: true,
})
export class Assistance implements OnInit {
  carreras: Carrera[] = [];
  materias: Materia[] = [];
  clases: Clase[] = [];
  alumnos: Alumno[] = [];
  carreraSeleccionada: Carrera | null = null;
  materiaSeleccionada: Materia | null = null;
  claseSeleccionada: Clase | null = null;
  cargando: boolean = false;
  guardando: boolean = false;
  yaTomada: boolean = false;

  constructor(
    private carrerasService: CarrerasService, 
    private clasesService: ClasesService,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit(): void {
    this.obtenerCarreras();
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
        alert('Error al cargar carreras');
      }
    });
  }

  onCarreraSeleccionada(id?: number): void {
    if (!id) {
      this.resetearSeleccion();
      return;
    }

    console.log('Carrera seleccionada ID:', id);
    this.cargando = true;

    this.carrerasService.getMateriasByCarrera(id).subscribe({
      next: (response) => {
        this.materias = response?.data || [];
        console.log('Materias cargadas:', this.materias);
        this.materiaSeleccionada = null;
        this.clases = [];
        this.alumnos = [];
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener materias:', error);
        this.cargando = false;
        alert('Error al cargar materias');
      }
    });
  }

  onMateriaSeleccionada(materiaId?: number): void {
    if (!materiaId) {
      this.clases = [];
      this.alumnos = [];
      this.claseSeleccionada = null;
      return;
    }

    console.log('Materia seleccionada ID:', materiaId);
    this.cargando = true;

    this.clasesService.getClases().subscribe({
      next: (response) => {
        const todasLasClases = response?.data || [];
        this.clases = todasLasClases.filter(
          (clase: Clase) => clase.materias_id === materiaId
        );
        console.log('Clases filtradas:', this.clases);
        this.claseSeleccionada = null;
        this.alumnos = [];
        this.cargando = false;

        if (this.clases.length === 0) {
          alert('No hay clases registradas para esta materia');
        }
      },
      error: (error) => {
        console.error('Error al obtener clases:', error);
        this.cargando = false;
        alert('Error al cargar clases');
      }
    });
  }

  onClaseSeleccionada(claseId?: number): void {
    if (!claseId) {
      this.alumnos = [];
      this.claseSeleccionada = null;
      return;
    }

    console.log('Clase seleccionada ID:', claseId);
    this.cargando = true;

    this.asistenciaService.prepararTomarAsistencia(claseId).subscribe({
      next: (response) => {
        if (!response.success) {
          alert(response.message || 'Error al cargar alumnos');
          this.cargando = false;
          return;
        }

        const data = response.data;
        this.claseSeleccionada = data.clase;
        this.yaTomada = data.ya_tomada || false;
        this.alumnos = data.alumnos.map((alumno: any) => {
          const asistenciaPrev = data.asistencias_previas[alumno.id];
          
          return {
            id: alumno.id,
            userNombre: alumno.userNombre,
            userApellido: alumno.userApellido,
            userDocumento: alumno.userDocumento,
            nombre_completo: `${alumno.userApellido}, ${alumno.userNombre}`,
            condicion: asistenciaPrev?.condicion || 'presente',
            observacion: asistenciaPrev?.observacion || ''
          };
        });

        console.log('Alumnos cargados:', this.alumnos);
        console.log('Asistencia ya tomada:', this.yaTomada);
        this.cargando = false;

        if (this.alumnos.length === 0) {
          alert('No hay alumnos inscriptos en esta materia');
        }
      },
      error: (error) => {
        console.error('Error al preparar asistencia:', error);
        this.cargando = false;
        const mensaje = error.error?.message || 'Error al cargar información de la clase';
        alert(mensaje);
      }
    });
  }

  guardarAsistencia(): void {
    if (!this.claseSeleccionada || this.alumnos.length === 0) {
      alert('Debe seleccionar una clase con alumnos');
      return;
    }
    if (this.yaTomada) {
      const confirmar = confirm('La asistencia ya fue tomada. ¿Desea actualizarla?');
      if (!confirmar) return;
    }

    this.guardando = true;
    const asistencias = this.alumnos.map(alumno => ({
      user_id: alumno.id,
      condicion: alumno.condicion,
      observacion: alumno.observacion || null
    }));

    console.log('Guardando asistencias:', asistencias);

    this.asistenciaService.guardarAsistencias(this.claseSeleccionada.id, asistencias).subscribe({
      next: (response) => {
        console.log('Respuesta:', response);
        this.guardando = false;
        this.yaTomada = true;
        alert(response.message || 'Asistencia guardada correctamente');
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        this.guardando = false;
        const mensaje = error.error?.message || 'Error al guardar la asistencia';
        alert(mensaje);
      }
    });
  }

  resetearSeleccion(): void {
    this.carreraSeleccionada = null;
    this.materiaSeleccionada = null;
    this.claseSeleccionada = null;
    this.materias = [];
    this.clases = [];
    this.alumnos = [];
    this.yaTomada = false;
  }

  marcarTodos(condicion: 'presente' | 'ausente'): void {
    this.alumnos.forEach(alumno => {
      alumno.condicion = condicion;
    });
  }
}