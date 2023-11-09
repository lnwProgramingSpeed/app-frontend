import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Pusher from 'pusher-js';
import { MyVideoPageService } from '../my-video-page/my-video-page.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  message = '';
  messages = [];

  owner_id: string = '';
  user_id: string = '';
  user_name: string = '';
  userProfilePictureUrl: string = '';

  constructor(
    private myVideoPageService: MyVideoPageService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  onMessageChange(event: any) {
    this.message = event.target.value;
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      this.user_name = userObject.username;
      this.user_id = userObject._id;
      this.fetchProfilePicture();
    }

    const storedMessages = localStorage.getItem('chatMessages');
    this.messages = storedMessages ? JSON.parse(storedMessages) : [];

    this.route.paramMap.subscribe((params) => {
      const id = params.get('ownerId');
      if (id) {
        this.owner_id = id;
      } else {
        console.error('Owner ID not found in route parameters.');
      }
    });

    Pusher.logToConsole = true;

    const pusher = new Pusher('d3a49da1536a6af334ff', {
      cluster: 'ap1',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data) => {
      // Check if the message already exists in the array
      const existingMessage = this.messages.find(
        (msg) => msg.user_id === data.user_id && msg.message === data.message
      );

      // Add the message only if it's not already in the array
      if (!existingMessage) {
        this.messages.push(data);

        // Save messages to localStorage
        localStorage.setItem('chatMessages', JSON.stringify(this.messages));
      }
    });
  }

  submit(): void {
    const messageData = {
      user_id: this.user_id,
      username: this.user_name,
      message: this.message,
    };

    this.messages.push(messageData);

    localStorage.setItem('chatMessages', JSON.stringify(this.messages));

    // Save the message to the server
    this.http
      .post(`http://localhost:3000/api/messages/${this.owner_id}`, messageData)
      .subscribe(() => (this.message = ''));
  }

  fetchProfilePicture() {
    this.myVideoPageService.getProfilePicture(this.user_id).subscribe(
      (imageData: string) => {
        this.userProfilePictureUrl = `${imageData}`;
      },
      (error) => {
        console.error('Error fetching profile picture', error);
      }
    );
  }
}
