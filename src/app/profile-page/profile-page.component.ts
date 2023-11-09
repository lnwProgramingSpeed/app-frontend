import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from './profile-page.service';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  owner_id: string = '';
  owner_name: string = '';
  owner_email: string = '';

  allVideos: any[] = [];
  purchasesVideos: any[] = [];

  profilePictureUrl: string = '../../assets/img/user.png';

  constructor(
    private profilePageService: ProfilePageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('ownerId');
      if (id) {
        this.owner_id = id;
        console.log('Owner ID:', this.owner_id);
        this.getAllVideos();
        this.getPurchaseVideos();
        this.getOwner();
        this.fetchProfilePicture();
      } else {
        console.error('Owner ID not found in route parameters.');
      }
    });
  }

  getOwner(){
    this.profilePageService
      .getOwner(this.owner_id)
      .subscribe((owner: any) => {
        console.log('Owner info:', owner);
        this.owner_name = owner.username;
        this.owner_email = owner.email;
      });
  }

  getAllVideos() {
    this.profilePageService
      .getallVideos(this.owner_id)
      .subscribe((videos: any[]) => {
        this.allVideos = videos;
      });
  }

  getPurchaseVideos() {
    this.profilePageService
      .getPurchases(this.owner_id)
      .subscribe((videos: any[]) => {
        this.purchasesVideos = videos;
      });
  }

  fetchProfilePicture() {
    this.profilePageService.getProfilePicture(this.owner_id).subscribe(
      (imageData: string) => {
        this.profilePictureUrl = `${imageData}`;
      },
      (error) => {
        console.error('Error fetching profile picture', error);
      }
    );
  }

  toChat(){
    this.router.navigate(['/chat', this.owner_id]);
  }
}
