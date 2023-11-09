import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchingPageService {
  private urls = 'https://uhelp.cyclic.app';

  constructor(private httpClient: HttpClient) {}

  getVideos() {
    return this.httpClient.get(`${this.urls}videos`);
  }

  getVideoById(id: string) {
    return this.httpClient.get(`${this.urls}videos/${id}`);
  }

  getOwnerByVideoId(videoId: string): Observable<string> {
    return this.httpClient.get(`${this.urls}videos/owner/${videoId}`, {
      responseType: 'text',
    });
  }

  getOwner(owner_id: string) {
    return this.httpClient.get(`${this.urls}users/${owner_id}`);
  }

  getProfilePicture(user_id: string) {
    return this.httpClient.get(
      `${this.urls}users/getProfilePicture/${user_id}`,
      { responseType: 'text' }
    );
  }
}
