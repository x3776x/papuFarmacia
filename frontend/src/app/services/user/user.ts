import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

// TODO Validate data attributes from backend
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
export class User {
  private baseUrl: string = '';

  constructor(private httpClient: HttpClient, private config: Config) {
    this.baseUrl = `${this.config.getApiUrl()}/profiles`;
  }

  getData(idUser: number) {
    const headers = { Authorization: 'Bearer token' };
    return this.httpClient.get<UserTemplate>(`${this.baseUrl}/${idUser}`, { headers });
  }

  postData(user: UserTemplate) {
    return this.httpClient.post<UserTemplate>(`${this.baseUrl}`, {});
  }

  putData(user: UserTemplate) {
    const headers = { Authorization: 'Bearer token' };
    return this.httpClient.put<UserTemplate>(`${this.baseUrl}/${user.id}`, {}, { headers });
  }

  putProfilePhoto(user: UserTemplate) {
    const headers = { Authorization: 'Bearer token' };
    return this.httpClient.put<UserTemplate>(`${this.baseUrl}/${user.id}/picture`, {}, { headers });
  }
}
