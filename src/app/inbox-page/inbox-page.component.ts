import { Component, OnInit } from '@angular/core';
import { InboxPageService } from './inbox-page.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox-page',
  templateUrl: './inbox-page.component.html',
  styleUrls: ['./inbox-page.component.css'],
})
export class InboxPageComponent implements OnInit {
  usersList: Observable<any> | undefined;

  constructor(
    private inboxPageService: InboxPageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersList = this.inboxPageService.getAllUsers(); // Get all users
    console.log(this.usersList);
  }

  toChat(userId: string) {
    this.router.navigate(['/chat', userId]);
  }
}
