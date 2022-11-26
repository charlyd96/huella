import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiembrosComponent } from './pages/miembros/miembros.component';
import { SectoresComponent } from './pages/sectores/sectores.component';
import { NuevoTrayectoComponent } from './pages/nuevo-trayecto/nuevo-trayecto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarDireccionComponent } from './components/mostrar-direccion/mostrar-direccion.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { SharedModule } from '../shared/shared.module';
import { MostrarTrayectoComponent } from './components/mostrar-trayecto/mostrar-trayecto.component';
import { IngresarTramoComponent } from './components/ingresar-tramo/ingresar-tramo.component';
import { IngresarTrayectoComponent } from './components/ingresar-trayecto/ingresar-trayecto.component';
import { RegistrarOrganizacionMiembroOrgComponent } from './pages/registrar-organizacion-miembro-org/registrar-organizacion-miembro-org.component';
import { DetalleMiembroComponent } from './pages/detalle-miembro/detalle-miembro.component';
import {RouterModule} from '@angular/router';
import { CargarActividadesComponent } from './pages/cargar-actividades/cargar-actividades.component';



@NgModule({
  declarations: [
    MiembrosComponent,
    SectoresComponent,
    NuevoTrayectoComponent,
    MostrarDireccionComponent,
    ConfirmacionComponent,
    MostrarTrayectoComponent,
    IngresarTramoComponent,
    IngresarTrayectoComponent,
    RegistrarOrganizacionMiembroOrgComponent,
    DetalleMiembroComponent,
    CargarActividadesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ]
})
export class OrganizacionModule { }
