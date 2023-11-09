import { TestBed } from '@angular/core/testing';

import { MyVideoPageService } from './my-video-page.service';

describe('MyVideoPageService', () => {
  let service: MyVideoPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyVideoPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
