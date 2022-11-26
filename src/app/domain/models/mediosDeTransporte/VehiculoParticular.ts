import { Combustible } from '../Combustible';
import { MedioDeTransporte } from './MedioDeTransporte';

export interface VehiculoParticular extends MedioDeTransporte {
  tipoVehiculo: number,
  combustible: Combustible
}
