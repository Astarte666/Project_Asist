import { Routes } from '@angular/router';
import { PAGES_ROUTES } from './pages/private-pages.routes';
import { Login } from './pages/auth/login/login';


export const routes: Routes = [

    ...PAGES_ROUTES,

{
    path:'public', loadChildren: () => import ('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
},

{
    path:'private', loadChildren: () => import ('./pages/private-pages.routes').then(m => m.PAGES_ROUTES)
},

{
    path:'**', redirectTo: 'Login'
}


];
