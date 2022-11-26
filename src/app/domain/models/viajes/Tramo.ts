import { Direccion } from "../ubicacion/Direccion";
import { MedioDeTransporte } from '../mediosDeTransporte/MedioDeTransporte';
import { Trayecto } from './Trayecto';
import { TipoMedioDeTransporteEnum } from '../../enums/TipoMedioDeTransporteEnum';
import { TransportePublico } from '../mediosDeTransporte/TransportePublico';
import { MediosPropios } from '../mediosDeTransporte/MediosPropios';
import { ServicioContratado } from '../mediosDeTransporte/ServicioContratado';
import { VehiculoParticular } from '../mediosDeTransporte/VehiculoParticular';
import { EnumMetadata } from "../../enums/EnumMatadata";
import { SystemEnums } from '../../enums/SystemEnums';

export class Tramo {
  nombre!: string;
  inicio!: Direccion | null;
  fin!: Direccion | null;
  medioDeTransporte!: MedioDeTransporte | null;
  esCompartido!: boolean;
  trayectos!: Trayecto[];

  public getNombre(): string {
    return this.nombre
  }

  public getInicio(): string {
    if (this.medioDeTransporte?.tipo == TipoMedioDeTransporteEnum.TRANSPORTE_PUBLICO) {
      let transportePublico = this.medioDeTransporte as TransportePublico;
      return this.concatDireccion(transportePublico.paradaInicio.direccion);
    }
    return this.concatDireccion(this.inicio);
  }

  public getFin(): string {
    if (this.medioDeTransporte?.tipo == TipoMedioDeTransporteEnum.TRANSPORTE_PUBLICO) {
      let transportePublico = this.medioDeTransporte as TransportePublico;
      return this.concatDireccion(transportePublico.paradaFin.direccion);
    }
    return this.concatDireccion(this.fin);
  }

  public getMedioDeTransporte(enums: SystemEnums): string {
    //console.log("string transporte publico: ", this.getStringTransportePublico(enums.tipoTransportePublico));
   // console.log("enums: ", enums);

   console.log("this: ", this);


    switch (this.medioDeTransporte?.tipo) {
      case TipoMedioDeTransporteEnum.TRANSPORTE_PUBLICO:
        return this.getStringTransportePublico(enums.tipoTransportePublico)
      case TipoMedioDeTransporteEnum.VEHICULO_PARTICULAR:
        return this.getStringVehiculoParticular(enums.tipoVehiculo);
      case TipoMedioDeTransporteEnum.SERVICIO_CONTRATADO:
        return this.getStringServicioContratado(enums.tipoVehiculo);
      case TipoMedioDeTransporteEnum.MEDIOS_PROPIOS:
        return (this.medioDeTransporte as MediosPropios).detalle;
      default: '';
    }
    return '';

  }

  private concatDireccion(direccion: Direccion | null): string {
    return `${direccion?.calle } ${direccion?.numero} (${direccion?.localidad.nombre})`;
  }

  private getDisplayValue(value: number, enums: EnumMetadata[]): string {
      return enums.find(e => e.value == value)?.displayName || '';
  }

  private getStringTransportePublico(tipoTransportePublico: EnumMetadata[]): string {
    let tipo = this.getDisplayValue((this.medioDeTransporte as TransportePublico).linea.tipoTransportePublico, tipoTransportePublico);
    let linea = (this.medioDeTransporte as TransportePublico).linea.nombre;
    return `${tipo} - ${linea}`;
  }

  private getStringVehiculoParticular(tipoVehiculo: EnumMetadata[] ) {
    console.log("Tipo Vehículo", (this.medioDeTransporte as VehiculoParticular).tipoVehiculo);

    return this.getDisplayValue((this.medioDeTransporte as VehiculoParticular).tipoVehiculo, tipoVehiculo);
  }

  private getStringServicioContratado(tipoVehiculo: EnumMetadata[]) {
    let tipoServicioContratado = this.getDisplayValue((this.medioDeTransporte as ServicioContratado).tipoServicioContratado.tipoVehiculo, tipoVehiculo);
    let nombre = (this.medioDeTransporte as ServicioContratado).tipoServicioContratado.nombre;
    return `${nombre} - ${tipoServicioContratado}`;
  }
}
