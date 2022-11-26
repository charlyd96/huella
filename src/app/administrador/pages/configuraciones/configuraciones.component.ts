import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumMetadata } from '../../../domain/enums/EnumMatadata';
import { AuthService } from '../../../services/auth.service';
import { CrearFactorEmision } from '../../../domain/models/CrearFactorEmision';
import { FactorEmisionService } from '../../../services/factor-emision.service';
import { FactorEmision } from 'src/app/domain/models/FactorEmision';
import { CombustiblesService } from '../../../services/combustibles.service';
import { Combustible } from 'src/app/domain/models/Combustible';
import { FactorEmisionEnum } from 'src/app/domain/enums/FactorEmisionEnum';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styles: [
  ]
})
export class ConfiguracionesComponent implements OnInit {

  formulario: FormGroup = this.fb.group({
    tipoFactorEmision: [ 0, Validators.required ],
    nombre: [ '', Validators.required ],
    valor: [ '', Validators.required ],
    combustible: [ '', Validators.required ],
    tipoOpcion: [ 0, Validators.required ]
  })

  tipoFactorEmisionSeleccionado: number = FactorEmisionEnum.ACTIVIDAD;
  tipoActividadSeleecionado: number = 0;
  factoresEmision: FactorEmision[] = [];
  combustibles: Combustible[] = [];
  loading: Boolean = false;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private factorEmisionService: FactorEmisionService,
    private combustibleService: CombustiblesService,
    private router: Router,
    private alertService: AlertService) { }

  async ngOnInit() {
    this.factorEmisionService.getFactoresEmision()
      .then((listadoFactoresEmision) => {
        this.factoresEmision = listadoFactoresEmision;
    })
    .catch((err) => {
      this.alertService.displayErrorAlert(['Ocurrió un error al consultar los factores de emisón', err.error.message]);
    });

    this.combustibleService.getCombustibles()
      .then((listadoCombustiblesResponse) => {
        this.combustibles = listadoCombustiblesResponse;
      })
      .catch((err) => {
        this.alertService.displayErrorAlert(['Ocurrió un error al consultar los combustibles', err.error.message]);
      })
  }

  public get getTitulo(): string {
    if (this.tipoFactorEmisionSeleccionado == FactorEmisionEnum.ACTIVIDAD) {
      return 'Tipo Actividad'
    }

    if (this.tipoFactorEmisionSeleccionado == FactorEmisionEnum.TRANSPORTE_PUBLICO) {
      return 'Tipo Transporte Público'
    }

    if (this.tipoFactorEmisionSeleccionado == FactorEmisionEnum.VEHICULO) {
      return 'Tipo Vehículo'
    }

    return '';
  }

  public get opciones(): EnumMetadata[] {
    if (this.tipoFactorEmisionSeleccionado == FactorEmisionEnum.ACTIVIDAD) {
      return this.tiposActividad
    }

    if (this.tipoFactorEmisionSeleccionado == FactorEmisionEnum.TRANSPORTE_PUBLICO) {
      return this.tiposTransportesPublicos
    }

    if (this.tipoFactorEmisionSeleccionado == FactorEmisionEnum.VEHICULO) {
      return this.tiposVehiculos
    }

    return [];
  }


  public actualizarTipo() {
    this.tipoFactorEmisionSeleccionado = Number.parseInt(this.formulario.get('tipoFactorEmision')?.value)
    console.log("Factor de emisión seleccionado: ", this.tipoFactorEmisionSeleccionado);
  }

  public crear() {
    if (this.formulario.invalid) {
      this.alertService.displayAlert('Aviso', ['Hay campos obligatorios sin completar']);
      return;
    }
    let crearFactorEmisionModel:  CrearFactorEmision = {
      combustibleId: this.formulario.get('combustible')?.value,
      nombre: this.formulario.get('nombre')?.value,
      valor: this.formulario.get('valor')?.value,
      tipoFactorEmision: this.formulario.get('tipoFactorEmision')?.value,
      tipoActividad: this.formulario.get('tipoFactorEmision')?.value == 0 ? this.formulario.get('tipoOpcion')?.value : null,
      tipoTransportePublico: this.formulario.get('tipoFactorEmision')?.value == 1 ? this.formulario.get('tipoOpcion')?.value : null,
      tipoVehiculo : this.formulario.get('tipoFactorEmision')?.value == 2 ? this.formulario.get('tipoOpcion')?.value : null
    }

    if (crearFactorEmisionModel.tipoActividad == 3) {
      crearFactorEmisionModel.combustibleId = 0;
    }

    this.loading = true;
    this.factorEmisionService.crearFactorEmision(crearFactorEmisionModel)
    .then(() => {
      this.alertService.displayAlert('Aviso', ['El factor de emisión se creó con éxito!']);
    })
    .catch((err) => {
      this.alertService.displayErrorAlert(['Ocurrió un error al intentar crear el factor de emisión.', err.error.message]);
    })
    .finally(() => this.loading = false);
  }



  get tiposVehiculos() {
    return this.auth.systemEnums?.tipoVehiculo;
  }

  get tiposActividad() {
    return this.auth.systemEnums?.tipoActividad;
  }

  get tiposTransportesPublicos() {
    return this.auth.systemEnums?.tipoTransportePublico;
  }

  get tiposFactoresEmision() {
    return this.auth.systemEnums?.tipoFactorEmision;
  }


}
