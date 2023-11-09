import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EditVideoPageService {
  constructor(private httpClient: HttpClient) {}

  editVideo(
    title: string,
    description: string,
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
      thumbnail,
      university,
      year,
      term,
      price,
    };

    return this.httpClient.post(`videos`, formData);
  }
}
