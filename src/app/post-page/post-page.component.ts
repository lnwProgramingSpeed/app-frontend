import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { PostPageService } from './post-page.service';
import { NgForm } from '@angular/forms';
import * as fs from 'fs';
import { Dropbox, Error, files } from 'dropbox';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css'],
})
export class PostPageComponent implements OnInit {
  @ViewChild('videoFileInput', { static: false }) videoFileInput!: ElementRef;
  thumbnailObject: File | null = null;

  isLoading: boolean = false;
  isSuccess: boolean = false;

  title: string = '';
  description: string = '';
  videoObject: any;
  thumbnail: string = 'https://picsum.photos/740/480';
  university: string = '';
  year: string = '';
  term: string = '';
  price: number = 0;

  universities = ['CU', 'CMU', 'MU', 'SWU', 'TU', 'MFU', 'KU'];
  yearList = ['2019', '2020', '2021', '2022', '2023'];
  termList = ['1', '2', '3'];

  constructor(
    private postPageService: PostPageService,
    private router: Router,
    private configService: ConfigService
  ) {}

  ACCESS_TOKEN = '';
  dbx = new Dropbox({ accessToken: this.ACCESS_TOKEN });
  async handleAccessToken() {
    await this.configService.getAccessToken().then((accessToken: string) => {
      this.ACCESS_TOKEN = accessToken;
    });
  }

  async ngOnInit() {
    await this.handleAccessToken();
    this.dbx = new Dropbox({ accessToken: this.ACCESS_TOKEN });
  }

  // Chunking
  // chunkFile(file: any, chunkSize: any) {
  //   const chunks = [];
  //   let offset = 0;

  //   while (offset < file.size) {
  //     const chunk = file.slice(offset, offset + chunkSize);
  //     chunks.push(chunk);
  //     offset += chunkSize;
  //   }

  //   return chunks;
  // }

  // async uploadChunksToDropBox(chunks: any[], file: any) {
  //   for (let i = 0; i < chunks.length; i++) {
  //     const chunk = chunks[i];
  //     const uploadPath = '/' + Date.now() + file.name + '_' + i; // Adjust the path as needed
  //     const result = await this.uploadChunkToDropbox(chunk, uploadPath);
  //     console.log('Chunk', i, 'uploaded:', result);
  //   }
  // }

  // async uploadChunkToDropbox(chunk: any, uploadPath: string) {
  //   return this.dbx.filesUpload({
  //     path: uploadPath,
  //     contents: chunk,
  //   });
  // }

  // onFileSelectedWhenTooBig(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const chunkSize = 15 * 1024 * 1024; // 15MB
  //     const chunks = this.chunkFile(file, chunkSize);
  //     this.uploadChunksToDropBox(chunks, file)
  //       .then(() => {
  //         console.log('File uploaded to Dropbox');
  //       })
  //       .catch((error) => {
  //         console.error('Error uploading file:', error);
  //       });
  //   }
  // }
  // Chunking

  onFileSelected(event: any) {
    // This function will upload a file to Dropbox or cancel it
    const file = event.target.files[0];
    if (file) {
      this.videoObject = file;
      console.log(this.videoObject);
    }
  }

  onThumbnailSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      const thumbnailFile = files[0];

      if (thumbnailFile.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent) => {
          const target = e.target as FileReader;
          const result = target.result as string;

          const img = new Image();
          img.src = result;

          img.onload = () => {
            const desiredWidth = 720; // Set your desired width
            const desiredHeight = 480; // Set your desired height

            // Calculate the aspect ratio
            const aspectRatio = img.width / img.height;

            // Calculate the new dimensions while maintaining the aspect ratio
            let width, height;

            if (aspectRatio > 1) {
              // Landscape orientation
              width = Math.min(desiredWidth, img.width);
              height = width / aspectRatio;
            } else {
              // Portrait or square orientation
              height = Math.min(desiredHeight, img.height);
              width = height * aspectRatio;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              this.thumbnail = canvas.toDataURL('image/jpeg', 0.8);
              console.log(this.thumbnail);
            } else {
              console.error('Canvas context not supported.');
            }
          };
        };

        reader.readAsDataURL(thumbnailFile);
      } else {
        console.error('Selected file is not an image.');
      }
    }
  }

  cancelUpload() {
    this.isLoading = false;
    window.location.reload();
  }

  uploadToDropBox(file: any): any {
    if (file.type === 'video/mp4') {
      const upload = '/' + Date.now() + file.name;

      return this.dbx
        .filesUpload({
          path: upload,
          contents: file,
        })
        .then((response: any) => {
          console.log('response', response.result);
          return response.result;
        })
        .catch((uploadErr: Error<files.UploadError>) => {
          console.log(uploadErr);
        });
    }
  }

  async uploadVideo(uploadForm: NgForm) {
    this.isLoading = true;
    const url_path = await this.uploadToDropBox(this.videoObject);
    console.log(url_path);

    const loginUser = localStorage.getItem('loggedInUser');
    let owner_id;
    if (loginUser) {
      owner_id = JSON.parse(loginUser);
    }

    if (uploadForm.valid && this.videoObject) {
      this.postPageService
        .uploadVideo(
          this.title,
          this.description,
          url_path,
          this.thumbnail,
          this.university,
          this.year,
          this.term,
          this.price,
          owner_id._id
        )
        .subscribe(
          (response) => {
            console.log('Video uploaded successfully', response);
            this.isSuccess = true;
          },
          (error) => {
            console.error('Error uploading video', error);
            this.isLoading = false;
            window.alert('Go change ACCESS_TOKEN, Maybe it expried.');
          }
        );
    }
  }

  toMyvideo() {
    this.router.navigate(['/myvideo']);
  }
}

// editVideo() {
//   this.postPageService
//     .editVideo(this.videoId, this.title, this.description, this.university, this.year, this.term)
//     .subscribe(
//       (response) => {
//         console.log('Video edited successfully', response);
//       },
//       (error) => {
//         console.error('Video edit failed', error);
//       }
//     );
// }

// deleteVideo() {
//   this.postPageService
//     .deleteVideo(this.videoId)
//     .subscribe(
//       (response) => {
//         console.log('Video deleted successfully', response);
//       },
//       (error) => {
//         console.error('Video deletion failed', error);
//       }
//     );
// }
