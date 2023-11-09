import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostPageComponent } from './post-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostPageComponent],
  exports: [PostPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
})
export class PostPageModule {}
