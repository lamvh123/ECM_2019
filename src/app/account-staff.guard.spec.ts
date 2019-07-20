import { TestBed, async, inject } from '@angular/core/testing';

import { AccountStaffGuard } from './account-staff.guard';

describe('AccountStaffGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountStaffGuard]
    });
  });

  it('should ...', inject([AccountStaffGuard], (guard: AccountStaffGuard) => {
    expect(guard).toBeTruthy();
  }));
});
