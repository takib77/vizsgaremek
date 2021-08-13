import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (
      !this.auth.currentUserSubject$ ||
      this.auth.currentUserSubject$.value?.role && Number(this.auth.currentUserSubject$.value?.role) < expectedRole
    ) {
      this.router.navigate(['forbidden']);
      return false;
    }

    return true;
  }

}
