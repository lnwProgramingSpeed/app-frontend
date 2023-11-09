import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InboxPageComponent } from './inbox-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InboxPageComponent],
  exports: [InboxPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
})
export class InboxPageModule { }
