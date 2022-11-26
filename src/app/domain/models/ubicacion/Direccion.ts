import { Localidad } from './Localidad';
import { Municipio } from './Municipio';
import { Provincia } from './Provincia';
export interface Direccion {
  calle: string,
  numero: string,
  municipio: Municipio,
  provincia: Provincia,
  localidad: Localidad,
  codigoPostal: string
}
