import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../domain/models/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class usuarioService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario) : Promise<number>{
   return this.http.post<number>(`${this.baseUrl}/register`,usuario).toPromise();
  }
}
