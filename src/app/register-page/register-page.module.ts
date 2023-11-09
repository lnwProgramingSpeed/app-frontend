import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './register-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RegisterPageComponent],
  exports: [RegisterPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
})
export class RegisterPageModule {}
