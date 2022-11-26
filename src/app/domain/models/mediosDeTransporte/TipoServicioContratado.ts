import { TipoVehiculo } from "../../enums/TipoVehiculoEnum";
import { Combustible } from "../Combustible";

export interface TipoServicioContratado {
  id?: number,
  nombre: string,
  tipoVehiculo: TipoVehiculo,
  combustible: Combustible
}
