import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStaffConfirmStudentComponent } from './account-staff-confirm-student.component';

describe('AccountStaffConfirmStudentComponent', () => {
  let component: AccountStaffConfirmStudentComponent;
  let fixture: ComponentFixture<AccountStaffConfirmStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountStaffConfirmStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStaffConfirmStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
