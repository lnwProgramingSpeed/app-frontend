import { TestBed } from '@angular/core/testing';

import { WatchingPageService } from './watching-page.service';

describe('WatchingPageService', () => {
  let service: WatchingPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchingPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
