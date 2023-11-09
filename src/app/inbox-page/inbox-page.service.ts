import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InboxPageService {
  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    const users = this.http.get(`${this.url}users`);
    console.log(users);
    return users;
  }
}
