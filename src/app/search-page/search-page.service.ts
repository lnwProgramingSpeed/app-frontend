import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchPageService {
  private url = 'http://localhost:3000/';

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
}
