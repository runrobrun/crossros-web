import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAthleteComponent } from './view-athlete.component';

describe('ViewAthleteComponent', () => {
  let component: ViewAthleteComponent;
  let fixture: ComponentFixture<ViewAthleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAthleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
