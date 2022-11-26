import { Sector } from "./Sector"

export interface Organizacion{
    id:number,
    nombre: string,
    huella: number,
    sectores: Sector[]
}
