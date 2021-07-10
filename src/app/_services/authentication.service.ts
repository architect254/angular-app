import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import jwt_decode from 'jwt-decode';

import { User } from '../_models/user';
import { JwtPayload } from '../_helpers/jwt.payload';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<any>;
  private jwtHelper = new JwtHelperService();

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.currentTokenSubject = new BehaviorSubject<any>(
      localStorage.getItem('accessToken')
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenUserValue() {
    const token = this.currentTokenSubject.value;
    if (token) {
      const payload: JwtPayload = jwt_decode(token);
      return payload.user;
    }
    return null;
  }

  public get currentTokenValue() {
    return this.currentTokenSubject.value;
  }

  register(name: string, email: string, password: string) {
    return this._http.post<User>(`${environment.apiUrl}/auth/sign-up`, {
      name,
      email,
      password,
    });
  }

  login(email: string, password: string) {
    return this._http.post<{ [key: string]: string }>(
      `${environment.apiUrl}/auth/sign-in`,
      {
        email,
        password,
      }
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken') || '';
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
    this.currentTokenSubject.next(null);
    this._router.navigate(['../sign-in'], { relativeTo: this._route });
  }
}
