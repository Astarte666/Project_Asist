import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Directives } from '../../directives/directives';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule, Directives],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {

  userName: string = '';
  userRole: string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getRol();
  }

  getRoleLabel(): string {
    const roleLabels: { [key: string]: string } = {
      'estudiante': 'Estudiante',
      'profesor': 'Profesor',
      'administrador': 'Preceptor'
    };
    return roleLabels[this.userRole] || this.userRole;
  }


  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
