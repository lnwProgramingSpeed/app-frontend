import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuyingPageService {
  private url = 'https://uhelp.cyclic.app';

  constructor(private httpClient: HttpClient) {}

  postComment(
    text: string,
    user_Id: string,
    username: string,
    video_Id: string
  ) {
    const formData = { text, user_Id, username, video_Id };
    console.log(formData);
    return this.httpClient.post(`${this.url}comments`, formData);
  }

  getVideos() {
    return this.httpClient.get(`${this.url}videos`);
  }

  getVideoById(id: string) {
    return this.httpClient.get(`${this.url}videos/${id}`);
  }

  getComments() {
    return this.httpClient.get(`${this.url}comments`);
  }

  findVideoComments(videoId: string) {
    return this.httpClient.get(`${this.url}comments/${videoId}`);
  }

  deleteComment(commentId: string) {
    return this.httpClient.delete(`${this.url}comments/${commentId}`);
  }

  getOwnerByVideoId(videoId: string): Observable<string> {
    return this.httpClient.get(`${this.url}videos/owner/${videoId}`, {
      responseType: 'text',
    });
  }

  getOwner(owner_id: string) {
    console.log(`${this.url}users/${owner_id}`);
    return this.httpClient.get(`${this.url}users/${owner_id}`);
  }

  purchaseVideo(owner_id: string, video_id: string) {
    const formData = { userId: owner_id, video_id };
    return this.httpClient.post(
      `${this.url}users/purchase/${owner_id}/${video_id}`,
      formData
    );
  }

  getProfilePicture(user_id: string) {
    return this.httpClient.get(
      `${this.url}users/getProfilePicture/${user_id}`,
      { responseType: 'text' }
    );
  }

  buyVideo(videoId: string): Observable<any> {
    const apiUrl = `${this.url}videos/buy/${videoId}`;
    return this.httpClient.put(apiUrl, {});
  }
}
