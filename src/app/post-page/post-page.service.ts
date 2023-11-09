import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostPageService {
  private url = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  uploadVideo(
    title: string,
    description: string,
    url_path: Object,
    thumbnail: string,
    university: string,
    year: string,
    term: string,
    price: number,
    owner_id: string
  ) {
    const formData = {
      title,
      description,
      url_path,
      thumbnail,
      university,
      year,
      term,
      price,
      owner_id,
    };

    return this.httpClient.post(`${this.url}videos`, formData);
  }
}
