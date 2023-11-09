import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterPageService {
  private url = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  checkEmailExist(email: string) {
    return this.httpClient.get<boolean>(
      `${this.url}users/check-email?email=${email}`
    );
  }

  register(username: string, email: string, password: string) {
    const userData = { username, email, password };
    return this.httpClient.post(`${this.url}users/register`, userData);
  }
}
