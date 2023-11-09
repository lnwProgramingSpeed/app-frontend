import { Component } from '@angular/core';
import { LoginPageService } from './login-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginPageService, private router: Router) {}

  loginUser() {
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        window.alert('Login successful!');
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        localStorage.setItem('token', 'your_generated_token_here');
        setTimeout(() => {
          window.location.reload();
        }, 500);
        this.router.navigate(['/search']);
      },
      (error) => {
        console.error('Login failed:', error);
        if (error.status === 401) {
          window.alert('Incorrect password. Please try again.');
        } else {
          window.alert('An error occurred during login.');
        }
      }
    );
  }
}
