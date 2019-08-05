import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewTimetableComponent } from './teacher-view-timetable.component';

describe('TeacherViewTimetableComponent', () => {
  let component: TeacherViewTimetableComponent;
  let fixture: ComponentFixture<TeacherViewTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherViewTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherViewTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
