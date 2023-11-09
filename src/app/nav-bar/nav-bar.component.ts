import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Checking local storage...');
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('loggedInUser');
    if (token && storedUser) {
      this.isLoggedIn = true;
      const userObject = JSON.parse(storedUser);
      this.username = userObject.username || '';
    }
    console.log('Is logged in:', this.isLoggedIn);
    console.log('Username from local storage:', this.username);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;
    this.username = '';
    window.alert('You have been logged out');
    this.router.navigate(['/home']);
  }
}
