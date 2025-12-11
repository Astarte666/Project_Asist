import { Routes } from "@angular/router";
import { Private } from "../core/layout/private/private";
import { Student } from "./student/student";
import { Teacher } from "./teacher/teacher";
import { Preceptor } from "./preceptor/preceptor";
import { Info } from "./info/info";
import { Dashboard } from "./dashboard/dashboard";
import { Assistance } from "./assistance/assistance";
import { Justify } from "./justify/justify";
import { Sms } from "./sms/sms";
import { Inscripciones } from "./inscripciones/inscripciones";
import { Gestion } from "./preceptor/gestion/gestion";
import { CarrerasMaterias } from "./carreras-materias/carreras-materias";
import { Clases } from "./clases/clases";


export const PAGES_ROUTES: Routes = [
  {
    path: '', 
    component: Private,
    children: [
      { path: 'student', component: Student, data:{ title:'Estudiante'} }, 
      { path: 'teacher', component: Teacher, data:{ title:'Profesor'} },
      { path: 'preceptor', component: Preceptor, data:{ title:'Preceptor'} },
      { path: 'gestion', component: Gestion, data:{ title:'Gestión'} },
      { path: 'info', component: Info, data:{ title:'Estadisticas'} },
      { path: 'dashboard', component: Dashboard, data:{ title:'Dashboard General'} },
      { path: 'assistance', component: Assistance, data:{ title:'Asistencia'} },
      { path: 'justify', component: Justify, data:{ title:'Justificaciones'} },
      { path: 'sms', component: Sms, data:{title:'Gestión'} },
      { path: 'inscripciones',  component: Inscripciones, data:{title:'Inscripciones'}},
      { path: 'carreras-materias', component: CarrerasMaterias, data: {title: 'Carreras y Materias'}},
      { path: 'clases', component: Clases, data: {title: 'Clases'}},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];