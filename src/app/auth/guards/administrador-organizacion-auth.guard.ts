import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorOrganizacionAuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private alertService: AlertService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.esAdministradorOrganizacion()) {
        return true;
      }
      this.alertService.displayErrorAlert(['No tiene permisos para consultar este recurso'], null, null, false)
      this.router.navigateByUrl('/home');
      return false;
  }
}
