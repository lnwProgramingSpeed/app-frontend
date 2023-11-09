import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.component.html',
  styleUrls: ['./qr-page.component.css']
})
export class QrPageComponent implements OnInit { 
  video_Id: string = '';

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('videoId');
      if (id) {
        this.video_Id = id;
      } else {
        console.error('Video ID not found in route parameters.');
      }
    });
  }


  
}
