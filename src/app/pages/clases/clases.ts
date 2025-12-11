import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrerasService, Carrera, Materia } from '../../core/services/carreras';
import { ClasesService } from '../../core/services/clases.service';

@Component({
  selector: 'app-clases',
  imports: [CommonModule, FormsModule],
  templateUrl: './clases.html',
  styleUrl: './clases.css'
})
export class Clases implements OnInit {

  carreras: Carrera[] = [];
  materias: Materia[] = [];
  clases: any[] = [];
  
  carreraSeleccionada: Carrera | null = null;
  
  nuevaClase = {
    materias_id: null as number | null,
    fecha: ''
  };

  cargando: boolean = false;
  guardando: boolean = false;

  constructor(
    private carrerasService: CarrerasService,
    private clasesService: ClasesService
  ) {}

  ngOnInit(): void {
    this.obtenerCarreras();
    this.obtenerClases();
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

  onCarreraChange(): void {
    if (!this.carreraSeleccionada?.id) {
      this.materias = [];
      return;
    }

    this.carrerasService.getMateriasByCarrera(this.carreraSeleccionada.id).subscribe({
      next: (response) => {
        this.materias = response?.data || [];
        this.nuevaClase.materias_id = null;
      },
      error: (error) => {
        console.error('Error al cargar materias:', error);
        alert('Error al cargar materias');
      }
    });
  }

  obtenerClases(): void {
    this.cargando = true;
    this.clasesService.getClases().subscribe({
      next: (response) => {
        this.clases = response?.data || [];
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar clases:', error);
        this.cargando = false;
        alert('Error al cargar clases');
      }
    });
  }

  crearClase(): void {
    if (!this.nuevaClase.materias_id || !this.nuevaClase.fecha) {
      alert('Complete todos los campos');
      return;
    }

    this.guardando = true;
    
    this.clasesService.createClase(this.nuevaClase as any).subscribe({
      next: (response) => {
        alert('Clase creada correctamente');
        this.obtenerClases();
        this.resetFormulario();
        this.guardando = false;
      },
      error: (error) => {
        console.error('Error al crear clase:', error);
        alert('Error al crear la clase');
        this.guardando = false;
      }
    });
  }

  eliminarClase(id: number): void {
    if (!confirm('¿Está seguro de eliminar esta clase?')) return;

    this.guardando = true;

    this.clasesService.deleteClase(id).subscribe({
      next: () => {
        alert('Clase eliminada correctamente');
        this.obtenerClases();
        this.guardando = false;
      },
      error: (error) => {
        console.error('Error al eliminar clase:', error);
        alert('Error al eliminar la clase');
        this.guardando = false;
      }
    });
  }

  resetFormulario(): void {
    const fechaActual = this.nuevaClase.fecha;
    this.nuevaClase = {
      materias_id: null,
      fecha: fechaActual
    };
    this.carreraSeleccionada = null;
    this.materias = [];
  }

  onCarreraSeleccionada(carreraId: number | null): void {
    this.onCarreraChange();
  }


}//end