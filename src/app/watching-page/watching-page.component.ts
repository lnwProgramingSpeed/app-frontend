import { Component, OnInit } from '@angular/core';
import { WatchingPageService } from './watching-page.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Dropbox, DropboxResponse, files } from 'dropbox';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-watching-page',
  templateUrl: './watching-page.component.html',
  styleUrls: ['./watching-page.component.css'],
})
export class WatchingPageComponent implements OnInit {
  video_Id: string = '';

  user_Id: string = ''; // Id of currently login user

  ownerId: string = '';
  ownerName: string = '';
  ownerEmail: string = '';
  userProfilePictureUrl: string = '';

  videoTitle: string = '';
  videoDescription: string = '';

  videoPath: string = '';

  videos: Observable<any> | undefined;

  constructor(
    private watchingPageService: WatchingPageService,
    private route: ActivatedRoute,
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

  async ngOnInit(): Promise<void> {
    await this.handleAccessToken();
    this.dbx = new Dropbox({ accessToken: this.ACCESS_TOKEN });

    const user = localStorage.getItem('loggedInUser');
    if (user) this.user_Id = JSON.parse(user)._id;

    this.videos = this.watchingPageService.getVideos(); // get all videos
    this.route.paramMap.subscribe((params) => {
      const id = params.get('videoId'); // get current video id
      if (id) {
        this.video_Id = id;
        console.log('Video ID:', this.video_Id);
        this.getOwnerInfo(); // owner of the video
        this.getVideoInfo(); // info of that video
        this.getVideo(); // display video
      } else {
        console.error('Video ID not found in route parameters.');
      }
    });
  }
  
  

  getVideoInfo() {
    const video = this.watchingPageService.getVideoById(this.video_Id);
    video.subscribe((response: any) => {
      console.log('video info', response);
      this.videoTitle = response.title;
      this.videoDescription = response.description;
    });
  }

  getOwnerInfo() {
    const ownerInfoObservable = this.watchingPageService.getOwnerByVideoId(
      this.video_Id
    );
    ownerInfoObservable.subscribe((owner_id: string) => {
      if (owner_id) {
        this.watchingPageService
          .getOwner(owner_id)
          .subscribe((ownerinfo: any) => {
            this.ownerName = ownerinfo.username;
            this.ownerEmail = ownerinfo.email;
            this.ownerId = owner_id;
            this.fetchProfilePicture();
          });
      }
    });
  }

  getVideo() {
    const video = this.watchingPageService.getVideoById(this.video_Id);
    video.subscribe(async (response: any) => {
      const videoPath: string = response.url_path.path_display;
      // console.log('video info', videoPath);
      const result = await this.getTemporaryLink(videoPath);
      // console.log(result);
      if (result) this.videoPath = result;
    });
  }
  async getTemporaryLink(filePath: string): Promise<string | null> {
    try {
      const response = await this.dbx.filesGetTemporaryLink({ path: filePath });

      if (response.status === 200) {
        return response.result.link;
      } else {
        console.error('Error getting temporary link:', response);
        return null;
      }
    } catch (error) {
      console.error('Error getting temporary link:', error);
      window.alert('Go change ACCESS_TOKEN, Maybe it expried.');
      return null;
    }
  }

  fetchProfilePicture() {
    this.watchingPageService.getProfilePicture(this.ownerId).subscribe(
      (imageData: string) => {
        this.userProfilePictureUrl = `${imageData}`;
      },
      (error) => {
        console.error('Error fetching profile picture', error);
      }
    );
  }

  toProfile() {
    if (this.ownerId === this.user_Id) {
      // user try to get their profile from outsider view
      this.router.navigate(['/myvideo']);
    } else {
      this.router.navigate(['/profile', this.ownerId]);
    }
  }
}
