import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMenuBarComponent } from './teacher-menu-bar.component';

describe('TeacherMenuBarComponent', () => {
  let component: TeacherMenuBarComponent;
  let fixture: ComponentFixture<TeacherMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
