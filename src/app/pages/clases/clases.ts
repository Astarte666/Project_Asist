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

  // paginación
  paginaActual: number = 1;
  itemsPorPagina: number = 10;
  totalPaginas: number = 0;
  clasesPaginadas: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  maxPagesToShow = 5;

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

  public sortColumn: string = 'fecha';
  public sortDirection: 'asc' | 'desc' = 'desc';

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
      this.totalPaginas = Math.ceil(this.clases.length / this.itemsPorPagina);
      this.paginaActual = 1;
      this.actualizarPaginacion();
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

actualizarPaginacion(): void {
  const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
  const fin = inicio + this.itemsPorPagina;
  this.clasesPaginadas = this.clases.slice(inicio, fin);
}

cambiarPagina(pagina: number): void {
  if (pagina < 1 || pagina > this.totalPaginas) return;
  this.paginaActual = pagina;
  this.actualizarPaginacion();
}

get paginas(): number[] {
  return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
}

get totalPages(): number {
  return Math.ceil(this.clases.length / this.itemsPerPage);
}

get clasesPaginadass() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.clases.slice(start, start + this.itemsPerPage);
}

get paginasVisibles(): number[] {
  const half = Math.floor(this.maxPagesToShow / 2);

  let start = Math.max(1, this.currentPage - half);
  let end = Math.min(this.totalPages, start + this.maxPagesToShow - 1);

  if (end - start + 1 < this.maxPagesToShow) {
    start = Math.max(1, end - this.maxPagesToShow + 1);
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}

irAPagina(p: number) {
  if (p >= 1 && p <= this.totalPages) {
    this.currentPage = p;
  }
}

ordenar(column: string): void {
    if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
    }
    this.clases.sort((a, b) => {
        let valA: any;
        let valB: any;
                if (column === 'materia') {
            valA = a.materia?.matNombre || '';
            valB = b.materia?.matNombre || '';
        } else if (column === 'carrera') {
            valA = a.materia?.carrera?.carreNombre || '';
            valB = b.materia?.carrera?.carreNombre || '';
        } else {
            valA = a[column];
            valB = b[column];
        }
        let comparison = 0;
        if (valA > valB) {
            comparison = 1;
        } else if (valA < valB) {
            comparison = -1;
        }
                return this.sortDirection === 'desc' ? comparison * -1 : comparison;
    });
    this.irAPagina(1);
}

}//end