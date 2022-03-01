import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetsCardListComponent } from './meets-card-list.component';

describe('MeetsCardListComponent', () => {
  let component: MeetsCardListComponent;
  let fixture: ComponentFixture<MeetsCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetsCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
