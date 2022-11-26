import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { MiembrosComponent } from './organizacion/pages/miembros/miembros.component';
import { ConfiguracionesComponent } from './administrador/pages/configuraciones/configuraciones.component';
import { OrganizacionesComponent } from './administrador/pages/organizaciones/organizaciones.component';
import { RegistroMiembro } from './persona/pages/register/registro-miembro.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { HuellaOrganizacionComponent } from './calculadora/pages/huella-organizacion/huella-organizacion.component';
import { NuevoTrayectoComponent } from './organizacion/pages/nuevo-trayecto/nuevo-trayecto.component';
import { RegistrarOrganizacionMiembroOrgComponent } from './organizacion/pages/registrar-organizacion-miembro-org/registrar-organizacion-miembro-org.component';
import { DetalleMiembroComponent } from './organizacion/pages/detalle-miembro/detalle-miembro.component';
import { ReportesComponent } from './administrador/pages/reportes/reportes.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdministradorGeneralAuthGuard } from './auth/guards/administrador-general-auth.guard';
import { AdministradorOrganizacionAuthGuard } from './auth/guards/administrador-organizacion-auth.guard';
import { MiembroAuthGuard } from './auth/guards/miembro-auth.guard';
import { CargarActividadesComponent } from './organizacion/pages/cargar-actividades/cargar-actividades.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'nuevo-trayecto', component: NuevoTrayectoComponent, canActivate: [AuthGuard, MiembroAuthGuard] },
  { path: 'configuraciones', component: ConfiguracionesComponent, canActivate: [AuthGuard, AdministradorGeneralAuthGuard] },
  { path: 'nueva-organizacion', component: OrganizacionesComponent, canActivate: [AuthGuard] },
  { path: 'alta-miembros', component: RegistroMiembro, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'miembros/:id', component: DetalleMiembroComponent, canActivate: [AuthGuard, AdministradorOrganizacionAuthGuard] },
  { path: 'huella', component: HuellaOrganizacionComponent, canActivate: [AuthGuard] },
  { path: 'registrar-organizacion-miembro-org', component: RegistrarOrganizacionMiembroOrgComponent, canActivate: [AuthGuard]  },
  { path: 'miembros', component: MiembrosComponent, canActivate: [AuthGuard, AdministradorOrganizacionAuthGuard]},
  { path: 'reportes', component: ReportesComponent },
  { path: 'cargar-actividades', component: CargarActividadesComponent, canActivate: [AuthGuard, AdministradorOrganizacionAuthGuard] },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
