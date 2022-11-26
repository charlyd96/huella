import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Linea } from '../domain/models/mediosDeTransporte/Linea';
import { Parada } from '../domain/models/mediosDeTransporte/Parada';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineasParadasService {
  private baseUrl = environment.baseUrl;

  constructor(private hhtp: HttpClient) { }

  getLineas(): Promise<Linea[]> {
    return this.hhtp.get<Linea[]>(`${this.baseUrl}/lineas`).toPromise();
  }

  getParadasByLineaId(id: number) {
    return this.hhtp.get<Parada[]>(`${this.baseUrl}/paradas/${id}`).toPromise();
  }
}
