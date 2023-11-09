import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyVideoPageService {
  private url = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  getMyVideos(user_id: string): Observable<any> {
    const url = `${this.url}users/myvideo/${user_id}`;
    return this.httpClient.get(url);
  }

  getVideos(video_id: string): Observable<any> {
    const url = `${this.url}videos/${video_id}`;
    return this.httpClient.get(url);
  }

  getPurchases(user_id: string): Observable<any> {
    const url = `${this.url}users/purchase/${user_id}`;
    return this.httpClient.get(url);
  }

  updateName(userId: string, newName: string) {
    return this.httpClient.put(`${this.url}users/update/${userId}`, {
      newName,
    });
  }

  updatePassword(userId: string, newPassword: string) {
    return this.httpClient.put(`${this.url}users/updatePassword/${userId}`, {
      newPassword,
    });
  }

  changeProfilePicture(user_id: string, profilePicture: string) {
    console.log(profilePicture, user_id);
    return this.httpClient.put(
      `${this.url}users/changeProfilePicture/${user_id}`,
      { profilePicture }
    );
  }

  getProfilePicture(user_id: string) {
    return this.httpClient.get(
      `${this.url}users/getProfilePicture/${user_id}`,
      { responseType: 'text' }
    );
  }

  deleteVideo(videoId: string) {
    return this.httpClient.delete(`${this.url}videos/delete/${videoId}`);
  }
}
