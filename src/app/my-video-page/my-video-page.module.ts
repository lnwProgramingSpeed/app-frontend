import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyVideoPageComponent } from './my-video-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MyVideoPageComponent],
  exports: [MyVideoPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
})
export class MyVideoPageModule { }
