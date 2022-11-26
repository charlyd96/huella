import { Component, OnInit, ViewChild } from '@angular/core';
import { Trayecto } from 'src/app/domain/models/viajes/Trayecto';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { EnumMetadata } from 'src/app/domain/enums/EnumMatadata';
import { IngresarTramoComponent } from '../../components/ingresar-tramo/ingresar-tramo.component';
import { IngresarTrayectoComponent } from '../../components/ingresar-trayecto/ingresar-trayecto.component';
import { Router } from '@angular/router';
import { TrayectosService } from 'src/app/services/trayectos.service';
import { AlertService } from '../../../services/alert.service';


@Component({
  selector: 'app-nuevo-trayecto',
  templateUrl: './nuevo-trayecto.component.html',
  styleUrls: [
    './nuevo-trayecto.component.css',
  ]
})

export class NuevoTrayectoComponent implements OnInit {

  @ViewChild(IngresarTrayectoComponent, {static: false}) ingresarTrayectoForm!: IngresarTrayectoComponent;
  @ViewChild(IngresarTramoComponent, {static: false}) ingresarTramoForm!: IngresarTramoComponent;

  mediosDeTransportes: EnumMetadata[] = [];
  trayecto: Trayecto = <Trayecto> {};
  step: number = 1;

  formTrayecto: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private trayectoService: TrayectosService,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService) { }

  async ngOnInit() {
    if (!this.authService.esMiembroAprobado()) {
      this.alertService.displayAlert('Aviso', ['Debe pertenecer a una organización antes de crear un trayecto']);
      this.router.navigateByUrl('/home');
    }
  }

  crearTrayecto(){
    let trayecto = this.ingresarTrayectoForm.getData();
    let tramos = this.ingresarTramoForm.getData();
    trayecto.tramo = tramos;
    this.trayecto = trayecto;

    this.trayectoService.crearTrayecto(trayecto)
    .then(() => {
      this.alertService.displayAlert('Aviso', ['El trayecto se creó exitosamente!'], null, null, false);
      this.router.navigateByUrl('/home');
    })
    .catch((err) => {
      this.alertService.displayErrorAlert([`Error al crear el trayecto.`, err.error.message], null, null, false);
    })
  }

  nextStep() {
    if (this.step == 3) {
      return;
    }

    if (this.step == 2) {
      let trayecto = this.ingresarTrayectoForm.getData();
      let tramos = this.ingresarTramoForm.getData();
      trayecto.tramo = tramos;
      this.trayecto = trayecto;
    }
    this.step++;
  }

  previusStep() {
    if (this.step <= 1) {
      return;
    }
    this.step--;
  }
}
