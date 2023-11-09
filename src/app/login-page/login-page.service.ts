import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  private url = 'https://rich-lime-rattlesnake-yoke.cyclic.app/';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const userData = { email, password };
    return this.httpClient.post(`${this.url}users/login`, userData);
  }
}
