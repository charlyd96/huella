import { RolEnum } from "../enums/RolEnum";
import { Usuario } from './organizacion/Usuario';

export interface UserClaims {
  rol?: RolEnum | null,
  usuarioId?: number | null,
  miembroId?: number,
  organizacionId?: number,
  agenteSectorialId?: number,
  usuario: Usuario
}
