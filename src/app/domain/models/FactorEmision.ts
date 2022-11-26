import { Combustible } from "./Combustible";

export interface FactorEmision {
  id: number,
  nombre: String,
  valor: number,
  tipoFactorEmision: number,
  tipoTransportePublico: number,
  tipoActividad: number,
  tipoVehiculo: number,
  combustible: Combustible
}
