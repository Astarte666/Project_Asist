import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] 
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup;
  verFeedback: boolean = false;
  dataFeedback: string = "";
  envData: boolean = false;

  constructor(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login(){
    let email: string = this.loginForm.get('email')?.value;
    let password: string = this.loginForm.get('password')?.value;

    if (this.loginForm.valid){
      this.envData = true;

      this.authService.login(email, password).subscribe({
        next: (data) => {
          console.log(data);
          this.inicioExitoso(data);
          this.envData = false;
        },
        error: (e) => {
          console.log(e);
          this.dataFeedback = e.error.message;
          this.verFeedback = true;
          this.envData = false;
        }
      });
    }
  }

  inicioExitoso(data: any): void {
    sessionStorage.setItem('authToken', data.token);
    sessionStorage.setItem('userName', `${data.user.userApellido}, ${data.user.userNombre}`);
    sessionStorage.setItem('rol', data.rol);

    if (data.rol === "administrador") {
      this.router.navigate(['/private/preceptor']);
    } else if (data.rol === "estudiante") {
      this.router.navigate(['/private/student']);
    }
    else if (data.rol === "profesor") {
      this.router.navigate(['/private/teacher']);
    }
  }
}
