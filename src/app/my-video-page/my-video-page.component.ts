import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyVideoPageService } from './my-video-page.service';
import { Dropbox } from 'dropbox';
import { ConfigService } from '../config.service';
import { error } from 'console';

@Component({
  selector: 'app-my-video-page',
  templateUrl: './my-video-page.component.html',
  styleUrls: ['./my-video-page.component.css'],
})
export class MyVideoPageComponent implements OnInit {
  userID: string = '';
  username: string = '';
  email: string = '';
  userProfilePictureUrl: string = '';

  formatMails: string = '';
  currentName: string = '';
  currentPassword: string = '';
  editMode: boolean = false;

  myVideos: any[] = [];
  purchaseVideos: any[] = [];

  constructor(
    private myVideoPageService: MyVideoPageService,
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
    this.dbx = new Dropbox({ accessToken: this.ACCESS_TOKEN }); // for delete in dropbox

    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('loggedInUser');
    if (token && storedUser) {
      const userObject = JSON.parse(storedUser);
      this.userID = userObject._id;
      this.currentName = this.username = userObject.username;
      this.email = userObject.email;
      this.fetchProfilePicture();
    }

    this.getMyVideos(this.userID);
    this.getPurchases(this.userID);
    this.formatMails = this.formatMail();
  }

  enableEditName() {
    this.editMode = !this.editMode;
  }

  formatMail() {
    const domain = this.email.split('@')[0];
    const formattedEmail = `@${domain}`;
    return formattedEmail;
  }

  getMyVideos(_id: string) {
    this.myVideoPageService.getMyVideos(_id).subscribe(
      (data: any[]) => {
        console.log(data);
        if (data && data.length > 0) {
          this.myVideos = data;
        } else {
          console.log('No videos found for the user.');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getPurchases(_id: string) {
    this.myVideoPageService.getPurchases(_id).subscribe(
      (data: any[]) => {
          console.log(data);
          if (data && data.length > 0) {
              this.purchaseVideos = data;

              const allVideosDeleted = data.every(video => video.deleted);

              if (allVideosDeleted) {
                  console.log('All purchased videos have been deleted.');
              }
          } else {
              console.log('No purchased videos found for the user.');
          }
      },
      (error) => {
          console.error(error);
          // Handle the error, e.g., display an error message to the user
      }
  );
  }

  posting() {
    this.router.navigate(['post']);
  }

  updateInfo() {
    if (this.username !== this.currentName) {
      // Update name in database
      this.myVideoPageService
        .updateName(this.userID, this.currentName)
        .subscribe(
          (data) => {
            console.log('Name updated successfully', data);
            this.editMode = false;
            window.alert('Please login again for updating');
            this.logout();
          },
          (error) => {
            console.error('Error updating name', error);
          }
        );
    }
    if (this.currentPassword) {
      // Update password in database
      this.myVideoPageService
        .updatePassword(this.userID, this.currentPassword)
        .subscribe(
          (data) => {
            console.log('Password updated successfully', data);
            this.editMode = false;
            window.alert('Please login again for updating');
            this.logout();
          },
          (error) => {
            console.error('Error updating password', error);
          }
        );
    }
  }

  private logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    this.username = '';
    this.router.navigate(['/login']);
  }

  // Profile picture

  selectedFile: File | null = null;
  resizedBase64String: string | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile);
    this.uploadProfilePicture();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  uploadProfilePicture() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 550; // Set your desired maximum width
          const maxHeight = 550; // Set your desired maximum height
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;

            if (width > maxWidth) {
              width = maxWidth;
              height = width / aspectRatio;
            }

            if (height > maxHeight) {
              height = maxHeight;
              width = height * aspectRatio;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) ctx.drawImage(img, 0, 0, width, height);

          this.resizedBase64String = canvas.toDataURL('image/jpeg', 0.8);
          if (this.resizedBase64String !== null) {
            this.myVideoPageService
              .changeProfilePicture(this.userID, this.resizedBase64String)
              .subscribe(
                (result) => {
                  console.log('Profile picture updated successfully', result);
                  // Handle success, e.g., display a message to the user
                },
                (error) => {
                  console.error('Error updating profile picture', error);
                  // Handle the error, e.g., display an error message
                }
              );
          }
        };
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  fetchProfilePicture() {
    this.myVideoPageService.getProfilePicture(this.userID).subscribe(
      (imageData: string) => {
        this.userProfilePictureUrl = `${imageData}`;
      },
      (error) => {
        console.error('Error fetching profile picture', error);
      }
    );
  }

  deleteVideo(videoId: string) {
    if (window.confirm('Are you sure you want to delete?') === true) {
      this.myVideoPageService.getVideos(videoId).subscribe(
        (data) => {
          const dropboxFilePath: string = data.url_path.path_display as string;
          if (dropboxFilePath) {
            this.dbx
              .filesDeleteV2({ path: dropboxFilePath })
              .then((response: any) => {
                console.log('Deleted video from Dropbox', response.result);

                this.myVideoPageService.deleteVideo(videoId).subscribe(
                  (result) => {
                    console.log('Deleted video', result);
                    this.reload();
                  },
                  (error) => {
                    console.error('Failed to delete video', error);
                  }
                );
              })
              .catch((error: any) => {
                console.error('Failed to delete video from Dropbox', error);
              });
          } else {
            console.error('Dropbox file path not found for the video');
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  reload() {
    window.location.reload();
  }

  editVideo() {
    this.router.navigate(['/editVideoPage']);
  }
}
