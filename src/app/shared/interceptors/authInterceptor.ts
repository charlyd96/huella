import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionId = localStorage.getItem('JSESSIONID');

    if (!sessionId) {
      return next.handle(req);
    }

    const headers = req.clone({
        headers: req.headers.set('JSESSIONID', sessionId)
      });
    return next.handle(headers);
  }
}
