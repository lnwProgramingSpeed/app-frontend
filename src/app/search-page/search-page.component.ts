import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchPageService } from './search-page.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent {
  private defaultType: string = '';

  universities = ['CU', 'CMU', 'MU', 'SWU', 'TU', 'MFU', 'KU'];
  yearList = ['2019', '2020', '2021', '2022', '2023'];
  termList = ['1', '2', '3'];

  selectedUniversity = this.defaultType;
  selectedYear = this.defaultType;
  selectedTerm = this.defaultType;

  numbersArray: number[] = [];

  searchValue: string = '';

  videos: Observable<any> | undefined;

  constructor(private searchService: SearchPageService) {}

  ngOnInit(): void {
    this.videos = this.searchService.getVideos();
  }

  selectUniversity(university: string) {
    this.selectedUniversity = university;
    this.getFilteredVideos();
  }

  selectYear(year: string) {
    this.selectedYear = year;
    this.getFilteredVideos();
  }

  selectTerm(term: string) {
    this.selectedTerm = term;
    this.getFilteredVideos();
  }

  getFilteredVideos() {
    this.videos = this.searchService.getFilteredVideos(
      this.selectedUniversity,
      this.selectedYear,
      this.selectedTerm
    );
  }

  search() {
    this.videos = this.searchService.getSearchVideos(this.searchValue);
  }

  buy(videoId: string) {
    this.searchService.buy(videoId);
  }
}
