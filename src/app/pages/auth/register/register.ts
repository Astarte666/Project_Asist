import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';import { RouterLink, Router } from '@angular/router';
import { Localidades } from '../../../core/services/localidades';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, FormGroupName } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/services/user';


@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {



  //Pasos del fomulario
  step =1;
  nextStep() {
    this.step++;
  }
  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }// end pasos

  //Funciones de registro
  private localidadesService = inject(Localidades);
  private authService = inject(AuthService);
  private router = inject(Router);
  private FormBuilder = inject(FormBuilder);

  provincias: any[]=[];
  localidades: any[]=[];
  registerForm: FormGroup;
  envData: boolean = false;
  verFormulario: boolean = true;
  verRegistroExitoso: boolean = false;


  constructor() {
  this.registerForm = this.FormBuilder.group({
  apellido: ['', [Validators.required, Validators.minLength(3)]],
  nombre: ['', [Validators.required, Validators.minLength(3)]],
  documento: ['', [Validators.required, Validators.minLength(7)]],
  telefono: ['', [Validators.required, Validators.minLength(8)]],
  provincia: ['', [Validators.required]],
  localidad: ['', [Validators.required]],
  domicilio: ['', [Validators.required, Validators.minLength(3)]],
  rol: ['', [Validators.required]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmedPassword: ['', [Validators.required]],
}, { validators: this.passwordMatchValidator });
  }


  ngOnInit(){
    this.localidadesService.getProvincias().subscribe(data=>{
      this.provincias = data.provincias;
    })
  }

  onProvinciaChange() {
    const selectedProvincia = this.registerForm.get('provincia')?.value;
    this.localidadesService.getLocalidades(selectedProvincia).subscribe({
      next: (data) => {
        this.localidades = data.localidades;
      },
      error: (e) => {
        console.log(e);
      }
    });

  }

  register(): void {
    if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    console.warn('Formulario inválido');
    return;
  }
    let nomProvincia = this.provincias.find(p => p.id === this.registerForm.get('provincia')?.value);
    let nomLocalidad = this.localidades.find(l => l.id === this.registerForm.get('localidad')?.value);
    let dataRegistro: User = {
      userApellido: this.registerForm.get('apellido')?.value,
      userNombre: this.registerForm.get('nombre')?.value,
      userDocumento: this.registerForm.get('documento')?.value.toString(),
      userTelefono: this.registerForm.get('telefono')?.value,
      userProvincia: nomProvincia?.nombre,
      userLocalidad: nomLocalidad?.nombre,
      userDomicilio: this.registerForm.get('domicilio')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      rol: this.registerForm.get('rol')?.value
    }


    if (this.registerForm.valid) {
      this.envData = true;

      this.authService.register(dataRegistro).subscribe({
        next: (data) => {
          console.log(data);
          this.envData = false;
          this.registroExitoso();
        },
        error: (e) => {
          console.log(e);
          this.envData = false;
        }
      });
    }

  }

  registroExitoso(): void {
    this.verFormulario = false;
    this.verRegistroExitoso = true;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }


  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmedPassword');
  if (!password || !confirmPassword) return null;
  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};




}//end
