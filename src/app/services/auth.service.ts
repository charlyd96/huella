import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemEnums } from '../domain/enums/SystemEnums';
import { UserClaims } from '../domain/models/UserClaims';
import { LoginUsuario } from '../domain/models/LoginUsuario';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { AlertService } from './alert.service';
import { RolEnum } from '../domain/enums/RolEnum';
import { InitService } from './init.service';
import { Miembro } from '../domain/models/organizacion/Miembro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  public systemEnumsProperty!: SystemEnums
  public userClaims: UserClaims = <UserClaims>{};
  public miembro: Miembro = <Miembro>{};
  observableUserClaims = new Subject<UserClaims>()

  constructor(private http: HttpClient,
    private router: Router,
    private alertService: AlertService,
    private initService: InitService) {
      this.systemEnumsProperty = initService.systemEnumsProperty;
      this.userClaims = initService.userClaims;
      this.miembro = initService.miembro;
    }

  public get systemEnums() {
    return this.systemEnumsProperty;
  }

  public async loadUser() {
    this.userClaims = await this.http.get<UserClaims>(`${this.baseUrl}/usuarios/data`).toPromise();
    console.log("miembroId: ", this.userClaims.miembroId);

    if (this.userClaims.miembroId) {
      this.initService.getMiembroData();
    }
    this.observableUserClaims.next();
    this.systemEnumsProperty = await this.http.get<SystemEnums>(`${this.baseUrl}/metadata-enums`).toPromise();
    console.log(this.systemEnumsProperty);
  }

  async login(loginUsuario: LoginUsuario) {
    return this.http.post<UserClaims>(`${this.baseUrl}/usuarios/login`, loginUsuario).toPromise()
      .then(userClaims => {
        this.userClaims = userClaims;
        this.observableUserClaims.next(userClaims);
        if (this.esSoloUsuarioRegistrado()) {
          this.router.navigateByUrl('/registrar-organizacion-miembro-org');
          return;
        }
        this.router.navigateByUrl('/home');
      })
      .catch(err => {
        this.userClaims = <UserClaims> {};
        this.alertService.displayErrorAlert(['Error al iniciar sesión', err.error.message], null, null, false);
      });
  }

  async logout() {
    return this.http.post<UserClaims>(`${this.baseUrl}/usuarios/logout`, null).toPromise()
      .then(() => {
        this.alertService.displayAlert('Aviso', ['La sesión se cerró correctamente']);
        this.router.navigateByUrl('/home');
      })
      .catch(err => {
        this.alertService.displayErrorAlert(['Error al cerrar la sesión: ', err.error.message], null, null, false);
      })
      .finally(() => {
        this.userClaims = <UserClaims> {};
        this.observableUserClaims.next(this.userClaims);
      });
  }

  estaLogeado() {
    return this.userClaims?.usuarioId != null;
  }

  esAdministradorGeneral() {
    return this.estaLogeado() && this.userClaims.rol == RolEnum.ADMINISTRADOR_GENERAL;
  }

  esAdministradorOrganizacion() {
    return this.estaLogeado() && this.userClaims.rol == RolEnum.ADMINISTRADOR_ORGANIZACION;
  }

  esMiembro() {
    return this.estaLogeado() && this.userClaims.rol == RolEnum.MIEMBRO;
  }

  esMiembroAprobado() {
    return this.estaLogeado() && this.userClaims.rol == RolEnum.MIEMBRO && this.miembro.aprobado;
  }

  esSoloUsuarioRegistrado() {
    console.log("estoy aca, usuario: ", this.userClaims);

    return this.estaLogeado() && this.userClaims.usuarioId != null && this.userClaims.rol == null;
  }
}
