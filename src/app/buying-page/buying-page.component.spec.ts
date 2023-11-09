import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingPageComponent } from './buying-page.component';

describe('BuyingPageComponent', () => {
  let component: BuyingPageComponent;
  let fixture: ComponentFixture<BuyingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyingPageComponent]
    });
    fixture = TestBed.createComponent(BuyingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
