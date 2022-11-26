import { Linea } from "./Linea";
import { MedioDeTransporte } from "./MedioDeTransporte";
import { Parada } from "./Parada";

export interface TransportePublico extends MedioDeTransporte {
  linea: Linea,
  paradaInicio: Parada,
  paradaFin: Parada,
}
