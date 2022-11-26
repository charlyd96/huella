import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrearMiembroModel } from '../domain/models/CrearMiembroModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MiembroService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  crearPersona(miembro: CrearMiembroModel) : Promise<number>{
   return this.http.post<number>(`${this.baseUrl}/miembro`, miembro).toPromise();
  }
}
