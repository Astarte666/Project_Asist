import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaService } from '../../core/services/asistencia.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';


interface EstadisticasGenerales {
  total_clases: number;
  presentes: number;
  ausentes: number;
  justificados: number;
  porcentaje_asistencia: number;
  materias_inscripto: number;
  materias_en_riesgo: number;
}

interface EstadisticaMateria {
  materia: {
    id: number;
    nombre: string;
    carrera: string;
  };
  total_clases: number;
  presentes: number;
  ausentes: number;
  justificados: number;
  porcentaje_asistencia: number;
  estado: 'regular' | 'en_riesgo';
}
@Component({
  selector: 'app-sms',
  imports: [CommonModule, FormsModule],
  templateUrl: './sms.html',
  styleUrl: './sms.css'
})
export class Sms  implements OnInit {

   estadisticasGenerales: EstadisticasGenerales | null = null;
    estadisticasPorMateria: EstadisticaMateria[] = [];
    loading: boolean = true;
    error: string | null = null;
    userId: number | null = null;
    
    filtroEstado: string = 'todas'; 
    filtroOrden: string = 'porcentaje_desc'; 
    busquedaMateria: string = '';
  
    constructor(private asistenciaService: AsistenciaService, private authService: AuthService) {}
  
    ngOnInit(): void {
      this.cargarEstadisticas();
    }
  
    cargarEstadisticas(): void {
      this.loading = true;
      this.error = null;
  
      const user = this.authService.getUser();
      this.userId = user?.id;
  
      if (!this.userId) {
        this.error = 'No se pudo obtener el usuario actual';
        this.loading = false;
        return;
      }
  
      this.asistenciaService.getEstadisticasGenerales(this.userId).subscribe({
        next: (response) => {
          if (response.success) {
            this.estadisticasGenerales = response.data.resumen_general;
            this.estadisticasPorMateria = response.data.por_materia;
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar estadísticas:', error);
          this.error = 'Error al cargar las estadísticas';
          this.loading = false;
        }
      });
    }
  
    get promedioFaltasMes(): number {
      if (!this.estadisticasGenerales || !this.estadisticasGenerales.total_clases) {
        return 0;
      }
      const meses = Math.ceil(this.estadisticasGenerales.total_clases / 16);
      return meses > 0 ? Math.round(this.estadisticasGenerales.ausentes / meses) : 0;
    }
  
    get materiasFiltradas(): EstadisticaMateria[] {
      let materias = [...this.estadisticasPorMateria];
  
      if (this.filtroEstado !== 'todas') {
        materias = materias.filter(m => m.estado === this.filtroEstado);
      }
  
      if (this.busquedaMateria.trim()) {
        const busqueda = this.busquedaMateria.toLowerCase();
        materias = materias.filter(m => 
          m.materia.nombre.toLowerCase().includes(busqueda) ||
          m.materia.carrera.toLowerCase().includes(busqueda)
        );
      }
  
      switch (this.filtroOrden) {
        case 'porcentaje_desc':
          materias.sort((a, b) => b.porcentaje_asistencia - a.porcentaje_asistencia);
          break;
        case 'porcentaje_asc':
          materias.sort((a, b) => a.porcentaje_asistencia - b.porcentaje_asistencia);
          break;
        case 'nombre':
          materias.sort((a, b) => a.materia.nombre.localeCompare(b.materia.nombre));
          break;
      }
  
      return materias;
    }
  
    getEstadoClass(porcentaje: number): string {
      if (porcentaje >= 85) return 'text-success';
      if (porcentaje >= 75) return 'text-warning';
      return 'text-danger';
    }
  
    getEstadoBadge(estado: string): string {
      return estado === 'regular' ? 'badge bg-success' : 'badge bg-danger';
    }
  
    getEstadoTexto(estado: string): string {
      return estado === 'regular' ? 'Regular' : 'En Riesgo';
    }
  
    refrescar(): void {
      this.cargarEstadisticas();
    }
  
    limpiarFiltros(): void {
      this.filtroEstado = 'todas';
      this.filtroOrden = 'porcentaje_desc';
      this.busquedaMateria = '';
    }

}//end