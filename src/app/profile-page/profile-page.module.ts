import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePageComponent } from './profile-page.component'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProfilePageComponent],
  exports:[ProfilePageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
})
export class ProfilePageModule { }
