import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) { //Interceptador que executa antes da solicitação
    /* console.log('Request is on its way ...'); */ //Obs: O objeto de solicitação é imutável
    console.log('Auth interceptor come after ...'); //Obs: O objeto de solicitação é imutável
    /* const modifiedRequest = req.clone({'url': 'http://localhost:8080/Rest/servicos/gravar'}); */
    const modifiedRequest = req.clone();
    /* const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')}); */
    /* return next.handle(req); */
    /* return next.handle(modifiedRequest).pipe(tap(event => { //modificando a resposta vinda do servidor
      console.log(event);
      if (event.type === HttpEventType.Response) {
        console.log('Response arrived, body data: ');
        console.log(event.body);
      }
    })); */
    return next.handle(modifiedRequest);
  }
}
