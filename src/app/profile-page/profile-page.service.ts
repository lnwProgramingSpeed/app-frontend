import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilePageService {
  private url = 'https://rich-lime-rattlesnake-yoke.cyclic.app/';

  constructor(private httpClient: HttpClient) {}

  getallVideos(owner_Id: string): Observable<any> {
    //use same logic as get my video but input the owner id
    const url = `${this.url}users/myvideo/${owner_Id}`;
    return this.httpClient.get(url);
  }

  getPurchases(owner_Id: string): Observable<any> {
    const url = `${this.url}users/purchase/${owner_Id}`;
    return this.httpClient.get(url);
  }

  getOwner(owner_id: string) {
    return this.httpClient.get(`${this.url}users/${owner_id}`);
  }

  getProfilePicture(owner_Id: string) {
    return this.httpClient.get(
      `${this.url}users/getProfilePicture/${owner_Id}`,
      { responseType: 'text' }
    );
  }
}
