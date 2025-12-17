import { Component } from '@angular/core';
import { CarrerasService } from '../../core/services/carreras';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carreras-materias',
  imports: [CommonModule, FormsModule],
  templateUrl: './carreras-materias.html',
  styleUrl: './carreras-materias.css'
})
export class CarrerasMaterias {

  carreNombre: string = '';
  matNombre: string = '';
  carreras: any[] = [];
  materias: any[] = [];
  loading = false;
  errorMsg = '';

  constructor(private carrerasService: CarrerasService) {}

  ngOnInit(): void {
    this.listaCarreras();
    this.listaMaterias();
  }

  listaCarreras() {
    this.loading = true;
    this.carrerasService.getAllMaterias().subscribe({
      next: (response: any) => {
        console.log('response API:', response);
        if (response?.data) {
          this.materias = response.data;
        } else {
          this.materias = Array.isArray(response) ? response : [];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al traer materias', err);
        this.errorMsg = 'No se pudo cargar la lista de materias.';
        this.loading = false;
      }
    });
  }

  listaMaterias() {
    this.loading = true;
    this.carrerasService.getAllCarreras().subscribe({
      next: (response: any) => {
        console.log('response API:', response);
        if (response?.data) {
          this.carreras = response.data;
        } else {
          this.carreras = Array.isArray(response) ? response : [];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al traer carreras', err);
        this.errorMsg = 'No se pudo cargar la lista de carreras.';
        this.loading = false;
      }
    });
  }

  //crear carrera
  crearCarrera() {
    const nombreCarrera = this.carreNombre;
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[name="materias[]"]:checked');
    const materiasSeleccionadas = Array.from(checkboxes).map(cb => Number(cb.value));

    const payload = {
      carreNombre: nombreCarrera,
      materias: materiasSeleccionadas
    };
    console.log('Se envía:', payload); 
    this.carrerasService.createCarrera(payload).subscribe({
      next: (res) => {
        alert('Carrera creada correctamente');
        this.carreNombre = '';
        this.listaMaterias();
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear la carrera');
      }
    });
  }

  crearMateria() {
    const nombreMateria = this.matNombre;
    const checkbox = document.querySelector<HTMLInputElement>('input[name="carreras[]"]:checked');

    if (!checkbox) {
      alert('Debe seleccionar una carrera');
      return;
    }
    const carreraId = Number(checkbox.value);
    const payload = {
      matNombre: nombreMateria,
      carreras_id: carreraId
    };
    console.log('Se envía:', payload);
    this.carrerasService.crearMateria(payload).subscribe({
      next: (res) => {
        alert('Materia creada correctamente');
        this.matNombre = '';
        this.listaCarreras();

      },
      error: (err) => {
        console.error(err);
        alert('Error al crear la materia');
      }
    });
  }



}//end
