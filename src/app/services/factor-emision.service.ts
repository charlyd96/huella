import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrearFactorEmision } from '../domain/models/CrearFactorEmision';
import { FactorEmision } from '../domain/models/FactorEmision';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactorEmisionService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  crearFactorEmision(factorEmision: CrearFactorEmision) : Promise<number>{
    return this.http.post<number>(`${this.baseUrl}/factor-emision`, factorEmision).toPromise();
  }

  getFactoresEmision() : Promise<FactorEmision[]> {
    return this.http.get<FactorEmision[]>(`${this.baseUrl}/factor-emision`).toPromise();
  }
}
