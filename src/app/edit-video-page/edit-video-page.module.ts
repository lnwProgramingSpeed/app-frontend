import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EditVideoPageComponent } from './edit-video-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditVideoPageComponent],
  exports: [EditVideoPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
})
export class EditVideoPageModule {}
