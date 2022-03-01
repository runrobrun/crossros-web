import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMeetComponent } from './view-meet.component';

describe('ViewMeetComponent', () => {
  let component: ViewMeetComponent;
  let fixture: ComponentFixture<ViewMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
