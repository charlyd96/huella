import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trayecto } from '../domain/models/viajes/Trayecto';


@Injectable({
  providedIn: 'root'
})
export class TrayectosService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  crearTrayecto(trayecto: Trayecto) : Promise<number>{
    return this.http.post<number>(`${this.baseUrl}/trayectos`, trayecto).toPromise();
  }




}
