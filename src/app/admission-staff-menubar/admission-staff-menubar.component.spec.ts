import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionStaffMenubarComponent } from './admission-staff-menubar.component';

describe('AdmissionStaffMenubarComponent', () => {
  let component: AdmissionStaffMenubarComponent;
  let fixture: ComponentFixture<AdmissionStaffMenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionStaffMenubarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionStaffMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
