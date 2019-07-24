import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficalStudentMenuBarComponent } from './offical-student-menu-bar.component';

describe('OfficalStudentMenuBarComponent', () => {
  let component: OfficalStudentMenuBarComponent;
  let fixture: ComponentFixture<OfficalStudentMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficalStudentMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficalStudentMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
