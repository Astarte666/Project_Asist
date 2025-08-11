import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assistance',
  imports: [CommonModule],
  templateUrl: './assistance.html',
  styleUrl: './assistance.css'
})
export class Assistance {

  estudiantes = [
  { nombre: 'Juan', asistencia: 'presente' },
  { nombre: 'Pepito', asistencia: 'ausente' },
  { nombre: 'Pedro Sanchez', asistencia: 'justificado' }
];


}
