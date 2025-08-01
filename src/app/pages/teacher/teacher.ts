import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';


interface DiaCalendario {
  fecha: Date;
  numero: number;
  esDelMes: boolean;
  esHoy: boolean;
  asistencias: {
    presente: number;
    ausente: number;
    justificado: number;
  };
}

@Component({
  selector: 'app-teacher',
  imports: [CommonModule],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css'
})
export class Teacher {

materias: any []=[];
semana: any [] = [];


// Configuración inicial
  fechaActual = new Date();
  mesActual = this.fechaActual.toLocaleString('default', { month: 'long' });
  anoActual = this.fechaActual.getFullYear();
  
  // Días de la semana
  diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  // Datos de ejemplo (deberías reemplazarlos con datos reales de tu API)
  diasCalendario: DiaCalendario[] = this.generarCalendario(this.fechaActual);

  // Generar la estructura del calendario
  generarCalendario(fecha: Date): DiaCalendario[] {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    const hoy = new Date();
    
    // Primer día del mes
    const primerDia = new Date(año, mes, 1);
    // Último día del mes
    const ultimoDia = new Date(año, mes + 1, 0);
    
    // Día de la semana del primer día (0-6)
    const diaInicio = primerDia.getDay();
    
    // Total de días en el mes
    const totalDias = ultimoDia.getDate();
    
    // Generar días del mes anterior para completar la primera semana
    const diasAnteriorMes = diaInicio;
    const dias: DiaCalendario[] = [];
    
    // Días del mes anterior
    const ultimoDiaMesAnterior = new Date(año, mes, 0).getDate();
    for (let i = diasAnteriorMes - 1; i >= 0; i--) {
      const diaNumero = ultimoDiaMesAnterior - i;
      dias.push({
        fecha: new Date(año, mes - 1, diaNumero),
        numero: diaNumero,
        esDelMes: false,
        esHoy: false,
        asistencias: { presente: 0, ausente: 0, justificado: 0 }
      });
    }
    
    // Días del mes actual
    for (let i = 1; i <= totalDias; i++) {
      const fechaDia = new Date(año, mes, i);
      const esHoy = fechaDia.toDateString() === hoy.toDateString();
      
      // Datos de ejemplo - reemplazar con datos reales
      const asistencias = {
        presente: Math.random() > 0.7 ? 1 : 0,
        ausente: Math.random() > 0.7 ? 1 : 0,
        justificado: Math.random() > 0.9 ? 1 : 0
      };
      
      dias.push({
        fecha: fechaDia,
        numero: i,
        esDelMes: true,
        esHoy: esHoy,
        asistencias: asistencias
      });
    }
    
    // Días del siguiente mes para completar la última semana
    const diasRestantes = 42 - dias.length; // 6 semanas * 7 días
    for (let i = 1; i <= diasRestantes; i++) {
      dias.push({
        fecha: new Date(año, mes + 1, i),
        numero: i,
        esDelMes: false,
        esHoy: false,
        asistencias: { presente: 0, ausente: 0, justificado: 0 }
      });
    }
    
    return dias;
  }

  // Navegación entre meses
  mesAnterior() {
    this.fechaActual = new Date(
      this.fechaActual.getFullYear(),
      this.fechaActual.getMonth() - 1,
      1
    );
    this.actualizarCalendario();
  }

  mesSiguiente() {
    this.fechaActual = new Date(
      this.fechaActual.getFullYear(),
      this.fechaActual.getMonth() + 1,
      1
    );
    this.actualizarCalendario();
  }

  actualizarCalendario() {
    this.mesActual = this.fechaActual.toLocaleString('default', { month: 'long' });
    this.anoActual = this.fechaActual.getFullYear();
    this.diasCalendario = this.generarCalendario(this.fechaActual);
  }

  // Verificar si el día tiene asistencias
  tieneAsistencias(dia: DiaCalendario): boolean {
    return dia.asistencias.presente > 0 || 
           dia.asistencias.ausente > 0 || 
           dia.asistencias.justificado > 0;
  }
}
