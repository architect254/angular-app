import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import jwt_decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../_models/user';
import { JwtPayload } from '../_helpers/jwt.payload';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<any>;
  private jwtHelper = new JwtHelperService();

  constructor(private _http: HttpClient,) {
    this.currentTokenSubject = new BehaviorSubject<any>(
      localStorage.getItem('token')
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenUserValue() {
    const token = this.currentTokenSubject.value;
    const payload: JwtPayload = jwt_decode(token.accessToken);
    return payload.user;
  }

  public get currentTokenValue() {
    return this.currentTokenSubject.value;
  }

  register(name: string, email: string, password: string) {
    return this._http
      .post<User>(`${environment.apiUrl}/auth/sign-up`, {
        name,
        email,
        password,
      });
  }



  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') || '';
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.currentTokenSubject.next(null);
  }
}
