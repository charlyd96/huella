import { Persona } from './Persona';
import { Trayecto } from '../viajes/Trayecto';
import { Organizacion } from './Organizacion';
import { Sector } from './Sector';

export interface Miembro{
    id: number,
    persona: Persona,
    trayecto:Trayecto,
    organizacion: Organizacion,
    huella: number,
    aprobado: Boolean,
    sector: Sector,
}
