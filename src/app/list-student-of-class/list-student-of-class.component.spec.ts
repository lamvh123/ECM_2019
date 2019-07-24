import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentOfClassComponent } from './list-student-of-class.component';

describe('ListStudentOfClassComponent', () => {
  let component: ListStudentOfClassComponent;
  let fixture: ComponentFixture<ListStudentOfClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentOfClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentOfClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
