import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clasificacion } from '../domain/models/Clasificacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getClasificaciones() : Promise<Clasificacion[]> {
    return this.http.get<Clasificacion[]>(`${this.baseUrl}/clasificaciones`).toPromise();
  }
}
