import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  private url = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const userData = { email, password };
    return this.httpClient.post(`${this.url}users/login`, userData);
  }
}
