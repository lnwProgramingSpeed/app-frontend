import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
})
export class LoginPageModule {}
