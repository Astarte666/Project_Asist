import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  // Propiedad para el título de la página (por ruta)
  pageTitle = '';
  
  // 🆕 Propiedad para el nombre del usuario logeado
  userName = ''; 

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // 🆕 1. Recuperar el nombre del usuario al inicializar el componente
    this.userName = sessionStorage.getItem('userName') || '';

    // 2. Suscripción para obtener el título de la página (ya existente)
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
        // El pageTitle sigue obteniendo el título de la ruta
        this.pageTitle = data['title'] || '';
        
        // 🆕 Opcional: Si navega a otra ruta, actualiza por si acaso
        // (Aunque el valor no debería cambiar a menos que el usuario se reloguee)
        this.userName = sessionStorage.getItem('userName') || this.userName;
      });
      
    // 🆕 Si quieres que el título se actualice inmediatamente después del login
    // sin tener que navegar, podrías considerar inyectar tu servicio de Auth
    // y suscribirte a un observable que emita el estado de login. 
    // Por simplicidad, el método de sessionStorage es más directo para este caso.
  }

  // 🆕 Método opcional para mostrar el título combinado
  get headerTitle(): string {
    // Si hay un nombre de usuario, muéstralo. 
    // Opcionalmente, puedes combinarlo con el pageTitle si quieres ambos.
    return this.userName || this.pageTitle;
  }
} //end