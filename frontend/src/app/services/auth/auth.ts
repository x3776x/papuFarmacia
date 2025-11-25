import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../config';

export interface UserTemplate {
  id?: number;
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  idRole?: number;
}

export interface LoginTemplate {
  identifier: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl: string = '';

  constructor(private httpClient: HttpClient, private config: Config) {
    this.baseUrl = `${this.config.getApiUrl()}`;
  }

  login(identifier: string, password: string) {
    return this.httpClient.post<LoginTemplate>(`${this.baseUrl}/login`, { identifier, password });
  }

  postUser(user: UserTemplate) {
    return this.httpClient.post<UserTemplate>(`${this.baseUrl}/register`, user);
  }

  // TODO Check if this is correct and what response are
  verifyToken() {
    return this.httpClient.get(`${this.baseUrl}/verify-token`);
  }
}
