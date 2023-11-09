import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QrPageComponent } from './qr-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [QrPageComponent],
  exports: [QrPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
})
export class QrPagePageModule { }
