import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrearOrganizacion } from '../domain/models/CrearOrganizacion';
import { Organizacion } from '../domain/models/organizacion/Organizacion';
import { Miembro } from '../domain/models/organizacion/Miembro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  crearOrganizacion(organizacion: CrearOrganizacion): Promise<number>{
   return this.http.post<number>(`${this.baseUrl}/organizacion`, organizacion).toPromise();
  }

  getOrganizaciones(): Promise<Organizacion[]> {
    return this.http.get<Organizacion[]>(`${this.baseUrl}/organizacion`).toPromise();
  }

  getMiembrosByOrganizacioId(id: number): Promise <Miembro[]> {
    return this.http.get<Miembro[]>(`${this.baseUrl}/organizaciones/${id}/miembros`).toPromise();
  }

}
