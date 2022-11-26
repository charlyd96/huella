import { Tramo } from '../viajes/Tramo';
import { FactorEmision } from '../FactorEmision';

export interface MedioDeTransporte {
  sePuedeCompartir: boolean,
  factorEmision: FactorEmision,
  tramo: Tramo,
  tipo: number
}
