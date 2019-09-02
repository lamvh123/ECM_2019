import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingStaffViewStudentDetailComponent } from './training-staff-view-student-detail.component';

describe('TrainingStaffViewStudentDetailComponent', () => {
  let component: TrainingStaffViewStudentDetailComponent;
  let fixture: ComponentFixture<TrainingStaffViewStudentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingStaffViewStudentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingStaffViewStudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
