import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Interceptor: Enviando token →', token); // Debug
    return next(authReq);
  }

  console.log('Interceptor: Sin token → petición sin auth');
  return next(req);
};