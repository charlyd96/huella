import { MedioDeTransporte } from './MedioDeTransporte';
import { TipoServicioContratado } from './TipoServicioContratado';

export interface ServicioContratado extends MedioDeTransporte {
  tipoServicioContratado: TipoServicioContratado
}
