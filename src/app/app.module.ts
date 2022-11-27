import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { AdministradorModule } from './administrador/administrador.module';
import { AuthModule } from './auth/auth.module';
import { CalculadoraModule } from './calculadora/calculadora.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersonaModule } from './persona/persona.module';
import { RecomendacionModule } from './recomendacion/recomendacion.module';
import { InitService } from './services/init.service';
import { AuthInterceptor } from './shared/interceptors/authInterceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    AdministradorModule,
    AuthModule,
    CalculadoraModule,
    OrganizacionModule,
    PersonaModule,
    RecomendacionModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    InitService,
    {provide : APP_INITIALIZER, useFactory : init, deps: [InitService, HttpClient] , multi : true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}

],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function init(initService: InitService) {
  return () =>  initService.init();
}
