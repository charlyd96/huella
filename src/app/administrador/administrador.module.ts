import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionesComponent } from './pages/configuraciones/configuraciones.component';
import { OrganizacionesComponent } from './pages/organizaciones/organizaciones.component';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ReportesComponent } from './pages/reportes/reportes.component';


@NgModule({
  declarations: [
    ConfiguracionesComponent,
    OrganizacionesComponent,
    ReportesComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdministradorModule { }
