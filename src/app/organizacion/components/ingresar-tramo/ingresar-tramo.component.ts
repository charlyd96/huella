import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DireccionComponent } from '../../../shared/components/direccion/direccion.component';
import { LineasParadasService } from '../../../services/lineas-paradas.service';
import { Linea } from 'src/app/domain/models/mediosDeTransporte/Linea';
import { Tramo } from 'src/app/domain/models/viajes/Tramo';
import { MedioDeTransporte } from '../../../domain/models/mediosDeTransporte/MedioDeTransporte';
import { TipoMedioDeTransporteEnum } from 'src/app/domain/enums/TipoMedioDeTransporteEnum';
import { TransportePublico } from '../../../domain/models/mediosDeTransporte/TransportePublico';
import { VehiculoParticular } from '../../../domain/models/mediosDeTransporte/VehiculoParticular';
import { ServicioContratado } from '../../../domain/models/mediosDeTransporte/ServicioContratado';
import { MediosPropios } from '../../../domain/models/mediosDeTransporte/MediosPropios';
import { Parada } from 'src/app/domain/models/mediosDeTransporte/Parada';
import { CombustiblesService } from '../../../services/combustibles.service';
import { Combustible } from 'src/app/domain/models/Combustible';
import { ServicioContratadoService } from '../../../services/servicio-contratado.service';
import { TipoServicioContratado } from '../../../domain/models/mediosDeTransporte/TipoServicioContratado';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-ingresar-tramo',
  templateUrl: './ingresar-tramo.component.html',
  styles: [
  ]
})
export class IngresarTramoComponent implements OnInit {

  @ViewChild('direccionInicial') direccionInicial!: DireccionComponent;
  @ViewChild('direccionFinal') direccionFinal!: DireccionComponent;

  formularioTramos = this.formBuilder.group({
    nombre: ['', Validators.required],
    tipoTransporte: ['', Validators.required],
    tipoTransportePublico: ['', Validators.required],
    transportePublico: this.formBuilder.group({
      linea: [''],
      paradaInicio: [''],
      paradaFin: ['']
    }),
    vehiculoParticular: this.formBuilder.group({
      tipoVehiculo: [''],
      combustible: [''],
    }),
    servicioContratado: this.formBuilder.group({
      tipoServicioContratado: ['']
    }),
    mediosPropios: this.formBuilder.group({
      detalle: ['']
    }),
  })

  tipoTransporteSeleccionado!: TipoMedioDeTransporteEnum;
  tiposTansporteEnum: typeof TipoMedioDeTransporteEnum = TipoMedioDeTransporteEnum;
  mostrarDirecciones: boolean = false;
  tramos: Tramo[] = [];
  paradas: Parada[] = [];
  lineas: Linea[] = [];
  lineasFiltradas: Linea[] = [];
  combustibles: Combustible[] = [];
  tiposServicioContratado: TipoServicioContratado[] = [];

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private lineasParadasService: LineasParadasService,
    private combustiblesService: CombustiblesService,
    private serviciosContratadosService: ServicioContratadoService,
    private alertService: AlertService) { }

  async ngOnInit() {
    this.lineasParadasService.getLineas().then(lineasResponse => {
      this.lineas = lineasResponse;
    });

    this.combustiblesService.getCombustibles().then(combustiblesResponse => {
      this.combustibles = combustiblesResponse;
    });

    this.serviciosContratadosService.getServiciosContratados().then(response => {
      this.tiposServicioContratado = response;
    })
  }

  agregarTramo() {
    let medioDeTransporte = this.getMedioDeTransporte();
    medioDeTransporte!.tipo = this.tipoTransporteSeleccionado;
    let esTransportePublico = this.tipoTransporteSeleccionado == TipoMedioDeTransporteEnum.TRANSPORTE_PUBLICO;
    console.log("medio de transporte: ", medioDeTransporte);

    let tramo = new Tramo();
    tramo.nombre = this.formularioTramos.controls.nombre.value;
    tramo.medioDeTransporte = medioDeTransporte;
    tramo.inicio = esTransportePublico ? (medioDeTransporte as TransportePublico).paradaInicio.direccion : this.direccionInicial?.getData(),
    tramo.fin = esTransportePublico ? (medioDeTransporte as TransportePublico).paradaFin.direccion  : this.direccionFinal?.getData(),

    this.tramos.push(tramo)
  }

  eliminarTramo(index: number) {
    let message = `¿Está seguro que desea eliminar el tramo '${this.tramos[index].nombre}'? `
    this.alertService.displayAlert('Confirmación', [message],
    () => {
      this.tramos.splice(index, 1);
    }, null, true);
  }

  getData() {
    return this.tramos;
  }

  public get tiposTransporte() {
    return this.authService.systemEnums?.tipoMedioDeTransporte;
  }

  public get tiposTransportesPublicos() {
    return this.authService.systemEnums?.tipoTransportePublico;
  }

  public get tiposVehiculosParticulares() {
    return this.authService.systemEnums?.tipoVehiculo;
  }

  public get systemEnums() {
    return this.authService.systemEnums;
  }

  setMedioTransporte() {
    this.tipoTransporteSeleccionado = this.formularioTramos.controls.tipoTransporte.value.value
    console.log("tipo selecionado: ", this.tipoTransporteSeleccionado)
  }

  setTipoTransportePublico() {
    this.lineasFiltradas = this.lineas.filter(l =>
      l.tipoTransportePublico == this.formularioTramos.controls.tipoTransportePublico.value)
  }

  setLinea() {
    let formularioTransportePublico = <FormGroup> this.formularioTramos.controls.transportePublico;
    let linea = formularioTransportePublico.controls.linea.value;
    this.lineasParadasService.getParadasByLineaId(linea.id).then(paradasResponse => {
      this.paradas = paradasResponse;
    })
  }

  setServicioContratado() {

  }

  getMedioDeTransporte(): MedioDeTransporte | null {
    let tipo = this.formularioTramos.controls.tipoTransporte.value.value;
    switch(tipo) {
      case TipoMedioDeTransporteEnum.TRANSPORTE_PUBLICO:
        return <TransportePublico> this.formularioTramos.controls.transportePublico.value;
      case TipoMedioDeTransporteEnum.VEHICULO_PARTICULAR:
        return <VehiculoParticular> this.formularioTramos.controls.vehiculoParticular.value;
      case TipoMedioDeTransporteEnum.SERVICIO_CONTRATADO:
        return <ServicioContratado> this.formularioTramos.controls.servicioContratado.value;
      case TipoMedioDeTransporteEnum.MEDIOS_PROPIOS: {
        return <MediosPropios> this.formularioTramos.controls.mediosPropios.value;
      }
    }
    return null;
  }
}
