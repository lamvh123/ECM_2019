import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterStaffViewClosedAdmissionFormComponent } from './center-staff-view-closed-admission-form.component';

describe('CenterStaffViewClosedAdmissionFormComponent', () => {
  let component: CenterStaffViewClosedAdmissionFormComponent;
  let fixture: ComponentFixture<CenterStaffViewClosedAdmissionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterStaffViewClosedAdmissionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterStaffViewClosedAdmissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
