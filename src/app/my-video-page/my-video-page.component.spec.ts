import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVideoPageComponent } from './my-video-page.component';

describe('MyVideoPageComponent', () => {
  let component: MyVideoPageComponent;
  let fixture: ComponentFixture<MyVideoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyVideoPageComponent]
    });
    fixture = TestBed.createComponent(MyVideoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
