import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);
  const user = await authService.logged();
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  } else {
    localStorage.clear();
    return router.createUrlTree(['/', 'auth']);
  }
};

export const notAuthGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);
  const user = await authService.logged();
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    return router.createUrlTree(['/']);
  } else {
    localStorage.clear();
    return true;
  }
};
