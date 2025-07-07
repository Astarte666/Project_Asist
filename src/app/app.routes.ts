import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Login } from './login/login';
import { Dashboard } from './student/dashboard/dashboard';
import { Teacher } from './teacher/teacher';
import { Student } from './student/student';
import { Preceptor } from './preceptor/preceptor';
import { Register } from './register/register';
import { Info } from './info/info';
import { Sidebar } from './shared/sidebar/sidebar';

export const routes: Routes = [

    //Otras rutas

    {path: 'Layout', component: Layout},
    {path: 'Login', component: Login},
    {path: 'Register', component: Register},
    {path: 'Teacher', component: Teacher},
    {path: 'Student', component: Student},
    {path: 'Preceptor', component: Preceptor},
    {path: 'Dashboard', component: Dashboard},
    {path: 'Info', component: Info},
    {path: 'Sidebar', component: Sidebar},
    

    //Inicio Predeterminado
    {path:'', component: Dashboard},
    {path: '**',component: Dashboard},

];
