import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ServicesConfig } from '../config';
import { environment } from '../../../environments/environment.development';
import { InterfaceLogin } from '../../interfaces/user/login';
import { InterfaceNewUser } from '../../interfaces/user/new-user';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  private baseUrl: string = '';

  constructor(private httpClient: HttpClient, private config: ServicesConfig) {
    this.baseUrl = environment.authService;
  }

  login(data: InterfaceLogin): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, data, { observe: 'response' }).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem('auth_token', res.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // TODO Check if this is correct and what response are
  verifyToken(tokenJWT: string) {
    return this.httpClient.get(`${this.baseUrl}/verify-token`);
  }

  postUser(user: InterfaceNewUser) {
    return this.httpClient.post<InterfaceNewUser>(`${this.baseUrl}/register`, user);
  }
}
