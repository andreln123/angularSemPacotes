import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean //Interrogação indica a opcionalidade do atributo
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  user = new Subject<User>();

  /* public signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost:8080/Rest/receitas/acesso/signUp?key=55555', {
      email: email,
      password: password,
      returnSecurityToken: true,
    }).pipe(catchError(errorRes => {
      let messageError = 'An unknown error occurred';
      return throwError(messageError);
    }), tap(resData => {
      const expirationData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      const user = new User(
        resData.email, 
        resData.localId, 
        resData.idToken,
        expirationData);

        this.user.next(user);
    }));
  } */

  public signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost:8080/Rest/receitas/acesso/signUp?key=55555', {
      email: email,
      password: password,
      returnSecurityToken: true,
    }).pipe(catchError(errorRes => {
      let messageError = 'An unknown error occurred';
      return throwError(messageError);
    }), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email, 
      userId, 
      token,
      expirationData);

    this.user.next(user);
  }

  public login(email: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost:8080/Rest/receitas/acesso/login?key=55555', {
      email: email,
      password: password,
      returnSecurityToken: true
    }).pipe(catchError(errorRes => {
      let messageError = 'An unknown error occurred';
      return throwError(messageError);
    }), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  /* public login(email: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost:8080/Rest/receitas/acesso/login?key=55555', {
      email: email,
      password: password,
      returnSecurityToken: true
    }).pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let messageError: string;
    errorRes => {
      let messageError = 'An unknown error occurred';
    };
    return throwError(messageError);
  } */
}
