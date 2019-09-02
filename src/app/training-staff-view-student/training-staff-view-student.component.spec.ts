import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingStaffViewStudentComponent } from './training-staff-view-student.component';

describe('TrainingStaffViewStudentComponent', () => {
  let component: TrainingStaffViewStudentComponent;
  let fixture: ComponentFixture<TrainingStaffViewStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingStaffViewStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingStaffViewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
