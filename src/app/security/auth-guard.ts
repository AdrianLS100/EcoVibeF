import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login-service';

export const authGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn()) {
    return true; // Sí, puede pasar
  }

  console.warn('Acceso denegado. Redirigiendo a /login');
  router.navigate(['/login']);
  return false;
};
