import { Component, OnInit } from '@angular/core';
import { GestionService } from '../../../core/services/gestion.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-gestion',
  imports: [CommonModule, RouterLink],
  templateUrl: './gestion.html',
  styleUrl: './gestion.css'
})
export class Gestion implements OnInit {

  usuariosPendientes: any[] = [];
  cargando = true;
  aceptando: number[] = [];

  constructor(private gestionService: GestionService) {}

  ngOnInit(): void {
    this.cargarPendientes();
  }

  cargarPendientes(): void {
    this.cargando = true;
    this.gestionService.getPendientes().subscribe({
      next: (data) => {
        this.usuariosPendientes = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        alert('Error al cargar solicitudes');
      }
    });
  }

  aceptar(id: number): void {
    this.aceptando = [...this.aceptando, id];
    this.gestionService.aceptarUsuario(id).subscribe({
      next: () => {
        this.usuariosPendientes = this.usuariosPendientes.filter(u => u.id !== id);
        this.aceptando = this.aceptando.filter(x => x !== id);
      },
      error: (err) => {
        this.aceptando = this.aceptando.filter(x => x !== id);
        alert(err.error?.message || 'Error al aceptar');
      }
    });
  }

}
