import { Routes } from '@angular/router';

export const routes: Routes = [


{
    path:'public', loadChildren: () => import ('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
},

{
    path:'private', loadChildren: () => import ('./pages/private-pages.routes').then(m => m.PAGES_ROUTES)
},

{
  path:'**', redirectTo: 'public/login'
}


];
