import { Direccion } from "../ubicacion/Direccion";

export interface Parada {
  id: number
  nombre: string,
  direccion: Direccion,
  distanciaParadaSiguiente: number,
  distanciaParadaAnterior: number,
}
