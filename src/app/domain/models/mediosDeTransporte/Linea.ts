import { Parada } from "./Parada";
import { Combustible } from '../Combustible';

export interface Linea {
  id?: number,
  nombre: string,
  paradas: Parada[],
  combustible: Combustible,
  tipoTransportePublico: number
}
