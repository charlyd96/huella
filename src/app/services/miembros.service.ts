import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Miembro } from '../domain/models/organizacion/Miembro';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MiembrosService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {  }

  getMiembro(id:string): Promise<Miembro>{
    return this.http.get<Miembro>(`${this.baseUrl}/miembro/${id}`).toPromise();
  }

  aprobarMiembro(id:number):Promise<number>{
    return this.http.post<number>(`${this.baseUrl}/miembro/${id}/aceptar`, null).toPromise();

  }

  rechazarMiembro(id:number):Promise<number>{
    return this.http.post<number>(`${this.baseUrl}/miembro/${id}/rechazar`, null).toPromise();
  }
}
