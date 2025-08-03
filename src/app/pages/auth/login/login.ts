import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginData: any = {
    userName:'',
    password: ''
  }

  router= inject(Router)

  onLogin(){
    if(this.loginData.userName == 'Admin' && this.loginData.password == 'zxcvbnm1' ){
      this.router.navigateByUrl("/admin")
      localStorage.setItem("user", "Admin")
    }else{
      alert ("Contraseña Incorrecta")
    }
  }

}
