import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAthleteDialogComponent } from './edit-athlete-dialog.component';

describe('EditAthleteDialogComponent', () => {
  let component: EditAthleteDialogComponent;
  let fixture: ComponentFixture<EditAthleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAthleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAthleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
