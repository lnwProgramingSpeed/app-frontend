import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InboxPageService {
  private url = 'https://rich-lime-rattlesnake-yoke.cyclic.app';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    const users = this.http.get(`${this.url}users`);
    console.log(users);
    return users;
  }
}
