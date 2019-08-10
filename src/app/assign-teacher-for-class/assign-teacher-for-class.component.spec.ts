import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTeacherForClassComponent } from './assign-teacher-for-class.component';

describe('AssignTeacherForClassComponent', () => {
  let component: AssignTeacherForClassComponent;
  let fixture: ComponentFixture<AssignTeacherForClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTeacherForClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTeacherForClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
