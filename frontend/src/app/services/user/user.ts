import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicesConfig } from '../config';
import { environment } from '../../../environments/environment.development';
import { InterfaceGetPhotoProfile } from '../../interfaces/user/get-photo-profile';

@Injectable({
  providedIn: 'root',
})
export class ServiceUser {
  private baseUrl: string = '';

  constructor(private httpClient: HttpClient, private config: ServicesConfig) {
    this.baseUrl = environment.userService;
  }
}
