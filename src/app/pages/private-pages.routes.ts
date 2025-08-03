import { Routes } from "@angular/router";
import { Private } from "../core/layout/private/private";
import { Student } from "./student/student";
import { Teacher } from "./teacher/teacher";
import { Preceptor } from "./preceptor/preceptor";
import { Info } from "./info/info";
import { Dashboard } from "./dashboard/dashboard";


export const PAGES_ROUTES: Routes = [
  {
    path: '', 
    component: Private,
    children: [
      { path: 'student', component: Student },
      { path: 'teacher', component: Teacher },
      { path: 'preceptor', component: Preceptor },
      { path: 'info', component: Info },
      { path: 'dashboard', component: Dashboard },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];