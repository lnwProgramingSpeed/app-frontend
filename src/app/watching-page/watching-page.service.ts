import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchingPageService {
  private url = 'https://uhelp.cyclic.app/';

  constructor(private httpClient: HttpClient) {}

  getVideos() {
    return this.httpClient.get(`${this.url}videos`);
  }

  getVideoById(id: string) {
    return this.httpClient.get(`${this.url}videos/${id}`);
  }

  getOwnerByVideoId(videoId: string): Observable<string> {
    return this.httpClient.get(`${this.url}videos/owner/${videoId}`, {
      responseType: 'text',
    });
  }

  getOwner(owner_id: string) {
    return this.httpClient.get(`${this.url}users/${owner_id}`);
  }

  getProfilePicture(user_id: string) {
    return this.httpClient.get(
      `${this.url}users/getProfilePicture/${user_id}`,
      { responseType: 'text' }
    );
  }
}
