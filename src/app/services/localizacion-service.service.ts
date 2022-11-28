import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Provincia } from '../domain/models/ubicacion/Provincia';
import { Municipio } from '../domain/models/ubicacion/Municipio';
import { Localidad } from '../domain/models/ubicacion/Localidad';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  private baseUrl: string =  environment.baseUrl;
  private provincias: Provincia[] = [];
  private headers: HttpHeaders = new HttpHeaders({'Authorization' : 'Bearer PdazKo/cXANtj9VMG3dgxxNs7Mdosruc0TEZg0YW+vc='});
  private OFFSET_INICIAL: number = 1;
  private MAX_RESPONSE: number = 50;

  constructor(private http: HttpClient) {
    this.internalGetProvincias()
  }

  public get getProvincias() : Provincia[] {
   return this.provincias;
  }

  private internalGetProvincias() {
    let url = this.getUrl('provincias');
    this.http.get<Provincia[]>(url, {headers: this.headers} ).toPromise()
      .then(res => this.provincias = res.map(l => <Provincia> {id: l.id, nombre: l.nombre}));
  }

  async getMunicipios(provinciaId: number) : Promise<Municipio[]> {
    let url = this.getUrl('municipios','provinciaId' , provinciaId);
    return <Municipio[]> await this.http.get<Municipio[]>(url, {headers: this.headers}).toPromise();
  }

  async getLocalidades(municipioId: number) : Promise<Municipio[]> {
    let url = this.getUrl('localidades','municipioId' , municipioId);
    return <Localidad[]> await this.http.get<Localidad[]>(url, {headers: this.headers}).toPromise();
  }

  private getUrl(recurso: string, param?: string,  paramId?: number,) {
    if (param) {
      return `${this.baseUrl}/${recurso}?${param}=${paramId}`
    }
    return `${this.baseUrl}/${recurso}`
  }
}
