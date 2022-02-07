import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteCardListComponent } from './athlete-card-list.component';

describe('AthleteCardListComponent', () => {
  let component: AthleteCardListComponent;
  let fixture: ComponentFixture<AthleteCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
