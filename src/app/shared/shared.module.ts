import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DireccionComponent } from './components/direccion/direccion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CampoRequeridoComponent } from './components/campo-requerido/campo-requerido.component';
import { RolDirective } from './directives/rol.directive';
import { RequiereSesionDirective } from './directives/requiere-sesion.directive';
import { GetEnumNamePipe } from './pipes/get-enum-name.pipe';
import { AlertComponent } from './components/alert/alert.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    DireccionComponent,
    CampoRequeridoComponent,
    RolDirective,
    RequiereSesionDirective,
    GetEnumNamePipe,
    AlertComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    DireccionComponent,
    CampoRequeridoComponent,
    GetEnumNamePipe,
    LoaderComponent
  ]
})
export class SharedModule { }
