import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Combustible } from '../domain/models/Combustible';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CombustiblesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCombustibles() : Promise<Combustible[]> {
    return this.http.get<Combustible[]>(`${this.baseUrl}/combustibles`).toPromise();
  }
}
