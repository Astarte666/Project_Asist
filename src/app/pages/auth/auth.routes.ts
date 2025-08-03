import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Public } from '../../core/layout/public/public';
import { Register } from './register/register';
import { Password } from './password/password';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: Public,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'password', component: Password }, 
    ]
  }
];

