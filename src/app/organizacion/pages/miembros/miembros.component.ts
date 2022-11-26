import { Component, OnInit } from '@angular/core';
import { MiembrosService } from '../../../services/miembros.service';
import { Miembro } from 'src/app/domain/models/organizacion/Miembro';
import { OrganizacionService } from '../../../services/organizacion.service';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styles: [
  ]
})
export class MiembrosComponent implements OnInit{

  miembrosAprobados: Miembro[] = [];
  constructor(private organizacionService: OrganizacionService,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit(): void{

   this.organizacionService.getMiembrosByOrganizacioId(this.authService.userClaims.organizacionId!)
    .then((listadoMiembrosAprobados) => {
      this.miembrosAprobados = listadoMiembrosAprobados;
    })
    .catch ((err) => {
      this.alertService.displayErrorAlert(['Ocurrió un error al consultar los miembros', err.error.message]);
    })
  }

}
