import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SystemEnums } from '../domain/enums/SystemEnums';
import { Miembro } from '../domain/models/organizacion/Miembro';
import { UserClaims } from '../domain/models/UserClaims';


@Injectable({
  providedIn: 'root'
})
export class InitService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public systemEnumsProperty!: SystemEnums
  public userClaims: UserClaims = <UserClaims>{};
  public miembro: Miembro = <Miembro>{};

  public async init() {
    return new Promise<Boolean>(async (resolve) => {
      this.userClaims = await this.http.get<UserClaims>(`${this.baseUrl}/usuarios/data`).toPromise();
      this.systemEnumsProperty = await this.http.get<SystemEnums>(`${this.baseUrl}/metadata-enums`).toPromise();
      if (this.userClaims.miembroId)
        await this.getMiembroData()

      resolve(true);
    })
  }

  async getMiembroData() {
    this.miembro = await this.http.get<Miembro>(`${this.baseUrl}/miembro/${this.userClaims.miembroId}`).toPromise();
  }
}
