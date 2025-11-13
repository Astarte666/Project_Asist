// src/app/pages/auth/login/login.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  verFeedback = false;
  dataFeedback = '';
  envData = false;


login() {
  if (this.loginForm.invalid) return;

  this.envData = true;
  this.verFeedback = false;

  const { email, password } = this.loginForm.value;

  this.authService.login(email!, password!).subscribe({
    next: () => {
      this.envData = false;
      const rol = this.authService.getRol();

      switch (rol) {
        case 'administrador':
          this.router.navigate(['/private/preceptor']);  
          break;
        case 'estudiante':
          this.router.navigate(['/private/student']);    
          break;
        case 'profesor':
          this.router.navigate(['/private/teacher']);   
          break;
        default:
          console.warn('Rol desconocido:', rol);
          this.router.navigate(['/private/dashboard']);
      }
    },
    error: (err) => {
      this.envData = false;
      this.verFeedback = true;
      this.dataFeedback = err.error?.message || 'Credenciales inválidas';
    }
  });
}
}