import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user-inscripcion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sms',
  imports: [CommonModule],
  templateUrl: './sms.html',
  styleUrl: './sms.css'
})
export class Sms implements OnInit {

carreras: any[] = [];
constructor(private userService: UserService){}

  ngOnInit(): void {
    this.cargarInscripciones();
  }

   cargarInscripciones() {
    this.userService.userCarrerasMaterias().subscribe({
      next: (response) => {
        console.log('Inscripciones:', response);
        this.carreras = response.carreras;
      },
      error: (err) => {
        console.error('Error al cargar inscripciones:', err);
      }
    });
  }
}