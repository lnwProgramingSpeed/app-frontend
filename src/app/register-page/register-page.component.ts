import { Component } from '@angular/core';
import { RegisterPageService } from './register-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private registerService: RegisterPageService,
    private router: Router
  ) {}

  registerUser() {
    this.registerService.checkEmailExist(this.email).subscribe(
      (emailExists) => {
        if (emailExists) {
          window.alert(
            'Email already exists. Please choose a different email.'
          );
        } else {
          this.registerService
            .register(this.username, this.email, this.password)
            .subscribe(
              (response) => {
                console.log('Registration successful', response);
                window.alert('Registration successful');
                this.router.navigate(['/home']);
              },
              (error) => {
                console.error('Registration failed', error);
              }
            );
        }
      },
      (error) => {
        console.error('Email validation failed', error);
      }
    );
  }

  samePassword(): boolean {
    if (this.password === this.confirmPassword) return true;
    return false;
  }

  // loginUser(email: string, password: string) {
  //   this.registerService.login(email, password).subscribe(
  //     (response) => {
  //       console.log('Login successful', response);
  //       // Handle successful login, e.g., store user credentials and navigate to a protected page.
  //     },
  //     (error) => {
  //       console.error('Login failed', error);
  //       // Handle login failure, e.g., display an error message.
  //     }
  //   );
  // }
}
