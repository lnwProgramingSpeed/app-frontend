import { TestBed } from '@angular/core/testing';

import { BuyingPageService } from './buying-page.service';

describe('BuyingPageService', () => {
  let service: BuyingPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyingPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
