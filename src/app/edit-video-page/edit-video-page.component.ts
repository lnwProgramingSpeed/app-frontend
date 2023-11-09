import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';
import { EditVideoPageService } from './edit-video-page.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-video-page',
  templateUrl: './edit-video-page.component.html',
  styleUrls: ['./edit-video-page.component.css'],
})
export class EditVideoPageComponent {
  // isLoading: boolean = false;
  // isSuccess: boolean = false;

  // title: string = '';
  // description: string = '';
  // videoObject: any;
  // thumbnail: string = 'https://picsum.photos/740/480';
  // university: string = '';
  // year: string = '';
  // term: string = '';
  // price: number = 0;

  // universities = ['CU', 'CMU', 'MU', 'SWU', 'TU', 'MFU', 'KU'];
  // yearList = ['2019', '2020', '2021', '2022', '2023'];
  // termList = ['1', '2', '3'];

  // constructor(
  //   private editPageService: EditVideoPageService,
  //   private router: Router
  // ) {}

  // async ngOnInit() {}

  // onFileSelected(event: any) {
  //   // This function will upload a file to Dropbox or cancel it
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.videoObject = file;
  //     console.log(this.videoObject);
  //   }
  // }

  // onThumbnailSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const files = input.files;

  //   if (files && files.length > 0) {
  //     const thumbnailFile = files[0];

  //     if (thumbnailFile.type.startsWith('image/')) {
  //       const reader = new FileReader();

  //       reader.onload = (e: ProgressEvent) => {
  //         const target = e.target as FileReader;
  //         const result = target.result as string;

  //         const img = new Image();
  //         img.src = result;

  //         img.onload = () => {
  //           const desiredWidth = 720; // Set your desired width
  //           const desiredHeight = 480; // Set your desired height

  //           // Calculate the new dimensions while maintaining the aspect ratio
  //           let width = img.width;
  //           let height = img.height;

  //           if (width > desiredWidth) {
  //             height = (desiredWidth / width) * height;
  //             width = desiredWidth;
  //           }

  //           if (height > desiredHeight) {
  //             width = (desiredHeight / height) * width;
  //             height = desiredHeight;
  //           }

  //           const canvas = document.createElement('canvas');
  //           canvas.width = desiredWidth;
  //           canvas.height = desiredHeight;
  //           const ctx = canvas.getContext('2d');

  //           if (ctx) {
  //             ctx.drawImage(
  //               img,
  //               0,
  //               0,
  //               width,
  //               height,
  //               0,
  //               0,
  //               desiredWidth,
  //               desiredHeight
  //             );
  //             this.thumbnail = canvas.toDataURL('image/jpeg', 0.8);
  //             console.log(this.thumbnail);
  //           } else {
  //             console.error('Canvas context not supported.');
  //           }
  //         };
  //       };

  //       reader.readAsDataURL(thumbnailFile);
  //     } else {
  //       console.error('Selected file is not an image.');
  //     }
  //   }
  // }

  // cancelUpload() {
  //   this.isLoading = false;
  //   window.location.reload();
  // }

  // async uploadVideo(uploadForm: NgForm) {
  //   this.isLoading = true;

  //   const loginUser = localStorage.getItem('loggedInUser');
  //   let owner_id;
  //   if (loginUser) {
  //     owner_id = JSON.parse(loginUser);
  //   }

  //   if (uploadForm.valid && this.videoObject) {
  //     this.editPageService
  //       .editVideo(
  //         this.title,
  //         this.description,
  //         this.thumbnail,
  //         this.university,
  //         this.year,
  //         this.term,
  //         this.price,
  //         owner_id._id
  //       )
  //       .subscribe(
  //         (response) => {
  //           console.log('Video edited successfully', response);
  //           this.isSuccess = true;
  //         },
  //         (error) => {
  //           console.error('Error editing video', error);
  //           this.isLoading = false;
  //           window.alert('Go change ACCESS_TOKEN, Maybe it expried.');
  //         }
  //       );
  //   }
  // }

  // toMyvideo() {
  //   this.router.navigate(['/myvideo']);
  // }
}
