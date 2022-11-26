import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Miembro } from '../../../domain/models/organizacion/Miembro';
import { MiembrosService } from '../../../services/miembros.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../../../services/alert.service';


@Component({
  selector: 'app-detalle-miembro',
  templateUrl: './detalle-miembro.component.html',
  styleUrls: ['./detalle-miembro.component.css']
})


export class DetalleMiembroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private miembrosService: MiembrosService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private alertService: AlertService
    ) { }
  miembro!: Miembro;

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')||'';
    this.miembrosService.getMiembro(id)
      .then((miembroObtenido) => {
        this.miembro = miembroObtenido;
    })
    .catch((err) => {
      this.alertService.displayErrorAlert(['Ocurrió un error al cargar el miembro', err.error.message]);
    })
  }

  public aprobar() {
    this.miembrosService.aprobarMiembro(this.miembro?.id ||0)
    .then(() => {
      this.alertService.displayAlert('Aviso', ['El miembro fue aprobado con éxito']);
      this.miembro.aprobado = true;
    })
    .catch((err) => {
      this.alertService.displayErrorAlert(['Ocurrió un error al aprobar el miembro', err.error.message]);
    })
  }


  public rechazar() {
    this.miembrosService.rechazarMiembro(this.miembro?.id ||0)
    .then((id) => {
      this.alertService.displayAlert('Aviso', ['El miembro fue rechazado con éxito']);
    })
    .catch((err) => {
      this.alertService.displayErrorAlert(['Ocurrió un error al rechazar el miembro', err.error.message]);
    })
  }

  public  getHuella(): number {
    if (this.miembro.huella == NaN)
      return 0

    return this.miembro.huella;
  }
}
