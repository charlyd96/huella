import { Direccion } from '../ubicacion/Direccion';
import { Tramo } from './Tramo';
export interface Trayecto {
  id?: number,
  nombre?: string,
  direccionInicio: Direccion,
  direccionFin: Direccion,
  tramo?: Tramo[]
}
