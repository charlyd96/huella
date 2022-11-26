import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RolEnum } from '../../domain/enums/RolEnum';
import { EnumMetadata } from 'src/app/domain/enums/EnumMatadata';

interface Ruta {
  nombreRuta: string,
  ruta: string,
  roles: RolEnum[]
}

interface RutaReporte {
  nombreReporte: string,
  reporte: string
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent  {

  rutas: Ruta[] = [
    { nombreRuta: 'Listado Miembros', ruta: 'miembros', roles: [RolEnum.ADMINISTRADOR_ORGANIZACION] },
    { nombreRuta: 'Añadirme como miembro', ruta: 'alta-miembros', roles: [] },
    { nombreRuta: 'Crear Trayecto', ruta: 'nuevo-trayecto', roles: [RolEnum.MIEMBRO] },
    { nombreRuta: 'Configurar Factores de Emisión', ruta: 'configuraciones', roles: [RolEnum.ADMINISTRADOR_GENERAL] },
    { nombreRuta: 'Crear Organización', ruta: 'nueva-organizacion', roles: [] },
    { nombreRuta: 'Cargar Datos de Actividad', ruta: 'cargar-actividades', roles: [] }
  ]

  rutaReporte: RutaReporte[] = [
    { nombreReporte: 'Reportes', reporte:'reportes'}, // 'hc-total-sector'},
    // { nombreReporte: 'HC total por tipo de Organizacion', reporte: 'hc-total-tipo-Organizacion'},
  ]

  constructor(private authService: AuthService) {}

  public get getRutas() {
    let rol = this.authService.userClaims.rol;
    return this.rutas.filter(r => r.roles.includes(rol || 0) || r.roles.length == 0);
  }

  async logout() {
    await this.authService.logout();
  }

  getUsuarioLogeado() {
    let rol = this.authService.userClaims?.rol ? this.getDisplayValue(this.authService.userClaims?.rol,  this.authService.systemEnums.rolesUsuario) : 'Sin Rol';

    return `${this.authService.userClaims.usuario} (${rol})`
  }

  private getDisplayValue(value: number, enums: EnumMetadata[]): string {
    return enums.find(e => e.value == value)?.displayName || '';
  }
}
