import { Direccion } from "./ubicacion/Direccion";
import { Sector } from './organizacion/Sector';
export interface CrearOrganizacion{
    nombre: String,
    razonSocial: String,
    tipoOrganizacion: number,
    clasificacion: number,
    email: String,
    numeroDeTelefono: String,
    direccion: Direccion,
    sectores: Sector[]
}
