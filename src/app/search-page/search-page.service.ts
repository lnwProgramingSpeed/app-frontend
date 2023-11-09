import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchPageService {
  private url = 'https://uhelp.cyclic.app/';

  constructor(private httpClient: HttpClient) {}

  getVideos() {
    return this.httpClient.get(`${this.url}videos`);
  }

  getSearchVideos(title: string) {
    const apiUrl = `${this.url}videos/search?title=${title}`;
    return this.httpClient.get(apiUrl); // /videos/search?title=${title}
  }

  getFilteredVideos(university: string, year: string, term: string) {
    const params = new URLSearchParams();
    if (university) params.append('university', university);
    if (year) params.append('year', year);
    if (term) params.append('term', term);

    const queryString = params.toString();
    const apiUrl = `${this.url}videos/filters${
      queryString ? `?${queryString}` : ''
    }`;

    return this.httpClient.get(apiUrl); // /videos/filters?university=university&year=year&term=term
  }

  buy(videoId: string) {
    return this.httpClient.put(`${this.url}buy/${videoId}`, {});
  }
}
