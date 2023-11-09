import { TestBed } from '@angular/core/testing';

import { EditVideoPageService } from './edit-video-page.service';

describe('EditVideoPageService', () => {
  let service: EditVideoPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditVideoPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
