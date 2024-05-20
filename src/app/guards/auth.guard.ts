import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService)
  const routes = inject(Router)
  const obj = service.getInfos()

  if(service.autenticado()) {
    return true;
  }

  routes.navigate(['/login'])
  return false;
};
