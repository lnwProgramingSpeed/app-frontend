import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BuyingPageComponent } from './buying-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BuyingPageComponent],
  exports: [BuyingPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  providers: [DatePipe],
})
export class BuyingPageModule {}
