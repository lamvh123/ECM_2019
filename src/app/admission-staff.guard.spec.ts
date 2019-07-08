import { TestBed, async, inject } from '@angular/core/testing';

import { AdmissionStaffGuard } from './admission-staff.guard';

describe('AdmissionStaffGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdmissionStaffGuard]
    });
  });

  it('should ...', inject([AdmissionStaffGuard], (guard: AdmissionStaffGuard) => {
    expect(guard).toBeTruthy();
  }));
});
