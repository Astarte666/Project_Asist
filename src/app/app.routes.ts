import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Login } from './login/login';
import { Dashboard } from './student/dashboard/dashboard';
import { Teacher } from './teacher/teacher';
import { Student } from './student/student';
import { PanelInicial } from './Dashboard/panel-inicial';
import { Preceptor } from './preceptor/preceptor';
import { Register } from './register/register';

export const routes: Routes = [

    //Otras rutas

    {path: 'Layout', component: Layout},
    {path: 'Login', component: Login},
    {path: 'Register', component: Register},
    {path: 'Teacher', component: Teacher},
    {path: 'Student', component: Student},
    {path: 'PanelInicial', component: PanelInicial},
    {path: 'Preceptor', component: Preceptor},
    {path: 'Dashboard', component: Dashboard},
    

    //Inicio Predeterminado
    {path:'', component: Dashboard},
    {path: '**',component: Dashboard},

];
