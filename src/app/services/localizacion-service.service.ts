import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Provincia } from '../domain/models/ubicacion/Provincia';
import { Municipio } from '../domain/models/ubicacion/Municipio';
import { Localidad } from '../domain/models/ubicacion/Localidad';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  private baseUrl: string =  '/api/'
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
    let url = this.getUrl('provincias', 1);
    this.http.get<Provincia[]>(url, {headers: this.headers} ).toPromise()
      .then(res => this.provincias = res.map(l => <Provincia> {id: l.id, nombre: l.nombre}));
  }

  async getMunicipios(provinciaId: number) : Promise<Municipio[]> {
    let municipios: Municipio[] = [];
    for(let offset = this.OFFSET_INICIAL; ; offset++) {
      let url = this.getUrl('municipios', offset,'provinciaId' , provinciaId);
      let response = <Municipio[]> await this.http.get<Municipio[]>(url, {headers: this.headers}).toPromise();
      response = response.map(l => <Municipio> {id: l.id, nombre: l.nombre})
      municipios = municipios.concat(response);
      if (response.length == 0 || response.length <= this.MAX_RESPONSE) {
        break;
      }
    }
    return municipios.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  async getLocalidades(municipioId: number) : Promise<Localidad[]> {
    let localidades: Localidad[] = [];
    for(let offset = this.OFFSET_INICIAL;  ; offset++) {
      let url = this.getUrl('localidades', offset,'municipioId' , municipioId);
      let response = await this.http.get<Localidad[]>(url, {headers: this.headers}).toPromise();
      response = response.map(l => <Localidad> {id: l.id, nombre: l.nombre});
      localidades = localidades.concat(response);
      if (response.length == 0 || response.length <= this.MAX_RESPONSE) {
        break;
      }
    }
    return localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  private getUrl(recurso: string, offset: number, param?: string,  paramId?: number,) {
    if (param) {
      return `${this.baseUrl}${recurso}?offset=${offset}&${param}=${paramId}`
    }
    return `${this.baseUrl}${recurso}?offset=${offset}`
  }
}
