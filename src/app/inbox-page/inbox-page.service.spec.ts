import { TestBed } from '@angular/core/testing';

import { InboxPageService } from './inbox-page.service';

describe('InboxPageService', () => {
  let service: InboxPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InboxPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
