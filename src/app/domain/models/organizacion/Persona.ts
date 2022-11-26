import { Usuario } from "./Usuario";
import { EnumMetadata } from '../../enums/EnumMatadata';

export interface Persona{
    id: number,
    nombre: string,
    apellido: string,
    mail: string,
    usuario: Usuario,
    tipoDoc: EnumMetadata,
    nroDocumento: string,
}
