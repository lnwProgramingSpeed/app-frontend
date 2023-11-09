import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchPageComponent } from './search-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchPageComponent],
  exports: [SearchPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
})
export class SearchPageModule {}
