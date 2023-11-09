import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WatchingPageComponent } from './watching-page.component'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WatchingPageComponent],
  exports: [WatchingPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
})
export class WatchingPageModule { }
