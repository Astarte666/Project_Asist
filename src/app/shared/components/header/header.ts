import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  pageTitle = '';
  userName = '';
  isLoggingOut = false;
  
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);

  ngOnInit() {
    // Carga inicial del nombre de usuario
    this.loadUserName();
    
    // Carga inicial del título de la página actual
    this.updatePageTitle();
    
    // Escucha cambios de navegación
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        this.pageTitle = data['title'] || '';
        this.loadUserName();
      });
  }

  /**
   * Actualiza el título de la página actual
   */
  private updatePageTitle(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    
    route.data.subscribe(data => {
      this.pageTitle = data['title'] || '';
    });
  }

  /**
   * Carga el nombre del usuario desde el storage
   */
  private loadUserName(): void {
    // Primero intenta localStorage, luego sessionStorage
    this.userName = localStorage.getItem('userName') || 
                    sessionStorage.getItem('userName') || '';
    
    // Debug: verifica qué hay en el storage
    if (!this.userName) {
      console.warn('⚠️ No se encontró userName en storage');
      console.log('localStorage:', localStorage.getItem('userName'));
      console.log('sessionStorage:', sessionStorage.getItem('userName'));
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    if (this.isLoggingOut) return;
    
    this.isLoggingOut = true;

    this.authService.logout().subscribe({
      next: () => {
        console.log('✅ Logout exitoso');
        this.redirectToLogin();
      },
      error: (error) => {
        console.error('❌ Error en logout:', error);
        this.authService.clearAuthData();
        this.redirectToLogin();
      }
    });
  }

  /**
   * Logout rápido sin llamar al backend
   */
  logoutQuick(): void {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.clearAuthData();
      this.redirectToLogin();
    }
  }

  /**
   * Redirige al login y limpia el estado
   */
  private redirectToLogin(): void {
    this.userName = '';
    this.isLoggingOut = false;
    this.router.navigate(['/login']);
  }

  /**
   * Retorna el título a mostrar en el header
   */
  get headerTitle(): string {
    return this.userName || this.pageTitle;
  }

  /**
   * Verifica si el usuario está autenticado
   */
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * Obtiene el rol del usuario actual
   */
  get userRole(): string {
    return this.authService.getRol();
  }
}