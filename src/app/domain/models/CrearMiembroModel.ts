import { Persona } from "./organizacion/Persona";

export interface CrearMiembroModel {
  persona: Persona,
  organizacionId: number,
  sectorId: number
}
