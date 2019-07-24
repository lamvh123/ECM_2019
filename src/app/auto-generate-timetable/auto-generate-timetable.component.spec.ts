import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGenerateTimetableComponent } from './auto-generate-timetable.component';

describe('AutoGenerateTimetableComponent', () => {
  let component: AutoGenerateTimetableComponent;
  let fixture: ComponentFixture<AutoGenerateTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoGenerateTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoGenerateTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
