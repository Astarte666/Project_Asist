import { Component, OnInit } from '@angular/core';
import { CarrerasService, Carrera, Materia } from '../../core/services/carreras';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../environments/environments';
import { UserInscripcionService } from '../../core/services/user-inscripcion.service';
import { User } from '../../core/services/user';


@Component({
  selector: 'app-inscripciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})
export class Inscripciones implements OnInit {

  carreras: Carrera[] = [];        
  materias: Materia[] = [];       
  carreraSeleccionada?: Carrera;     
  cargando: boolean = false;
  inscripciones: any[] = [];
  loading = true;  

  constructor(private carrerasService: CarrerasService, private authService: AuthService, 
  private http: HttpClient, private inscripcionesService: UserInscripcionService) {}

  ngOnInit(): void {
    this.obtenerCarreras();
    this.getInscripciones();
  }

  obtenerCarreras(): void {
    this.cargando = true;
    this.carrerasService.getAllCarreras().subscribe({
      next: (response) => {
        this.carreras = response?.data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener las carreras:', error);
        this.cargando = false;
      }
    });
  }

  onCarreraSeleccionada(id?: number): void {
    if (!id) {
      console.log('Carrera deseleccionada');
      this.materias = [];
      return;
    }

    console.log('Cargando materias para carrera ID:', id);

    this.carrerasService.getMateriasByCarrera(id).subscribe({
      next: (response) => {
        console.log('Respuesta materias (raw):', response);
        this.materias = response.data;  
        console.log('Materias asignadas:', this.materias);
      },
      error: (err) => {
        console.error('Error al cargar materias:', err);
        this.materias = [];
      }
    });
  }

  materiasSeleccionadas: Materia[] = [];

  agregarMateria(materia: Materia): void {
    if (!this.materiasSeleccionadas.includes(materia)) {
      this.materiasSeleccionadas.push(materia);
    }
  }

  eliminarMateria(materia: Materia): void {
    this.materiasSeleccionadas = this.materiasSeleccionadas.filter(m => m !== materia);
  }

  inscribirse() {
    if (!this.carreraSeleccionada) {
      alert('Selecciona una carrera');
      return;
    }
    if (this.materiasSeleccionadas.length === 0) {
      alert('Selecciona al menos una materia');
      return;
    }
    const user = this.authService.getUser();
    if (!user?.id) {
      alert('Error: usuario no autenticado');
      return;
    }
    const payload = {
      user_id: user.id,
      carrera_id: this.carreraSeleccionada.id,
      materias: this.materiasSeleccionadas.map(m => m.id)
    };

    console.log('Payload enviado:', payload);

    this.http.post(`${environment.apiURL}inscripciones`, payload).subscribe({
      next: (res) => {
        console.log('Inscripción exitosa:', res);
        alert('¡Inscripto con éxito!');
        this.materiasSeleccionadas = [];
      },
      error: (err) => {
        console.error('Error completo:', err);
        const msg = err.error?.message || err.message || 'Error desconocido';
        alert('Error: ' + msg);
      }
    });
  }

  getInscripciones() {
    console.log("Llamando a getInscripcionesUser()...");

    this.inscripcionesService.getInscripcionesUser().subscribe({
        next: (data) => {
          console.log("Respuesta inscripciones:", data);
          this.inscripciones = data;
          this.loading = false;
        },
        error: (err) => {
          console.error("Error cargando inscripciones:", err);
          this.loading = false;
        }
    });
  }



  


}//end
