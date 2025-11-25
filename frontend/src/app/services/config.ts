import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
  private baseUrl = 'https://api.example.com';

  getApiUrl(): string {
    return this.baseUrl;
  }
}
