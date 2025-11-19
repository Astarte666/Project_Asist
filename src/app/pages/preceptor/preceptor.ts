import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { GestionService } from '../../core/services/gestion.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-preceptor',
  imports: [RouterLink, CommonModule],
  templateUrl: './preceptor.html',
  styleUrls: ['./preceptor.css']
})
export class Preceptor implements OnInit {

  usuariosPendientes: any[] = [];
  cargando = true;
  aceptando: number[] = [];

  constructor(private gestionService: GestionService) {}

  ngOnInit(): void {
    this.cargarPendientes();
  }

  //Solicitudes pendientes
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
  //end Solicitudes

  //lista de usuarios
  listaUsuarios():void{
    
  }

}
