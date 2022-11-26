import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoServicioContratado } from '../domain/models/mediosDeTransporte/TipoServicioContratado';

@Injectable({
  providedIn: 'root'
})
export class ServicioContratadoService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getServiciosContratados(): Promise<TipoServicioContratado[]> {
    return this.http.get<TipoServicioContratado[]>(`${this.baseUrl}/servicios-contratados`).toPromise();
  }
}
