import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyingPageService } from './buying-page.service';
import { Observable } from 'rxjs';
import { Dropbox } from 'dropbox';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-buying-page',
  templateUrl: './buying-page.component.html',
  styleUrls: ['./buying-page.component.css'],
})
export class BuyingPageComponent implements OnInit {
  openComment: boolean = false;

  comment = ''; // Input comment
  video_Id: string = ''; // Id of video

  user_Id: string = ''; // Id of currently login user

  ownerName: string = '';
  ownerEmail: string = '';
  ownerId: string = '';
  userProfilePictureUrl: string = '';

  videoTitle: string = '';
  videoDescription: string = '';
  videoPrice: number = 0;
  videoPath: string = '';

  videos: Observable<any> | undefined; // Similar video
  comments: Observable<any> | undefined; // All comments
  constructor(
    private buyingPageService: BuyingPageService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private configService: ConfigService,
    private renderer: Renderer2
  ) {}

  ACCESS_TOKEN = '';
  dbx = new Dropbox({ accessToken: this.ACCESS_TOKEN });
  async handleAccessToken() {
    await this.configService.getAccessToken().then((accessToken) => {
      this.ACCESS_TOKEN = accessToken;
    });
  }

  async ngOnInit() {
    await this.handleAccessToken();
    this.dbx = new Dropbox({ accessToken: this.ACCESS_TOKEN });
    const user = localStorage.getItem('loggedInUser');
    if (user) this.user_Id = JSON.parse(user)._id;

    const token = localStorage.getItem('token');
    this.openComment = !!token;

    this.route.paramMap.subscribe((params) => {
      const id = params.get('videoId');
      if (id) {
        this.video_Id = id;
        console.log('Video ID:', this.video_Id);

        this.comments = this.buyingPageService.findVideoComments(this.video_Id); // all comments in that video
        this.getOwnerInfo(); // owner of the video
        this.getVideoInfo(); // info of that video
        this.getVideo(); // Display video tralier
      } else {
        console.error('Video ID not found in route parameters.');
      }
    });

    this.videos = this.buyingPageService.getVideos();
  }

  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  private startTime: number = 0;
  private endTime: number = 0;
  ngAfterViewInit() {
    this.setupVideoListeners();
  }

  setupVideoListeners() {
    const videoElement = this.videoPlayer.nativeElement;
  
    this.renderer.listen(videoElement, 'play', () => {
      this.startTime = Date.now();
    });
  
    this.renderer.listen(videoElement, 'timeupdate', () => {
      const currentTime = videoElement.currentTime;
  
      if (currentTime >= 15) {
        // Prevent playback beyond 15 seconds
        videoElement.currentTime = 15;
        videoElement.pause();
      }
    });
  }
  

  navigateToQRPage(video_Id: string) {
    this.router.navigate(['/qr', video_Id]);
  }

  navigateToBuying(video_Id: string) {
    this.router.navigate(['/buying', video_Id]);
    setTimeout(() => {
      this.reload();
    }, 0);
  }

  submitComment() {
    const userInfo = localStorage.getItem('loggedInUser');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      const userid = user._id;
      const username = user.username;

      if (this.comment !== '') {
        const currentTime = this.getCurrentTime(); // Get the current time
        const commentWithTime = `${currentTime} - ${this.comment}`; // Add the time to the comment
        this.buyingPageService
          .postComment(commentWithTime, userid, username, this.video_Id)
          .subscribe(
            (response) => {
              this.router.navigateByUrl(this.router.url);
              console.log('Comment submitted successfully', response);
            },
            (error) => {
              console.error('Error submitting comment', error);
            }
          );
        this.reload();
      } else {
        window.alert('At least write comment');
      }
    }
  }

  getCurrentTime() {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'hh:mm a');
  }

  getVideoInfo() {
    const video = this.buyingPageService.getVideoById(this.video_Id);
    video.subscribe((response: any) => {
      console.log('video info', response);
      this.videoTitle = response.title;
      this.videoDescription = response.description;
      this.videoPrice = response.price;
    });
  }

  getOwnerInfo() {
    const ownerInfoObservable = this.buyingPageService.getOwnerByVideoId(
      this.video_Id
    );
    ownerInfoObservable.subscribe((owner_id: string) => {
      if (owner_id) {
        this.buyingPageService
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

  // Displaty video part
  getVideo() {
    const video = this.buyingPageService.getVideoById(this.video_Id);
    video.subscribe(async (response: any) => {
      const videoPath: string = response.url_path.path_display;
      console.log('video info', videoPath);
      const result = await this.getTemporaryLink(videoPath);
      console.log(result);
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

  // Buy video
  purchase() {
    this.buyingPageService.purchaseVideo(this.user_Id, this.video_Id).subscribe(
      (result) => {
        if (result as boolean) {
          // true if already purchased
          window.alert('You already owner this video');
        } else {
          window.alert('Video purchased successfully');
          this.navigateToQRPage(this.video_Id);
        }
      },
      (error) => {
        console.error('Error purchasing video', error);
      }
    );
  }

  deleteComment(commentId: string) {
    this.buyingPageService.deleteComment(commentId).subscribe(
      (result) => {
        console.log('Deleted comment', result);
        this.reload();
      },
      (error) => {
        console.error('Failed to delete comment', error);
      }
    );
  }

  fetchProfilePicture() {
    this.buyingPageService.getProfilePicture(this.ownerId).subscribe(
      (imageData: string) => {
        this.userProfilePictureUrl = `${imageData}`;
      },
      (error) => {
        console.error('Error fetching profile picture', error);
      }
    );
  }

  reload() {
    window.location.reload();
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
