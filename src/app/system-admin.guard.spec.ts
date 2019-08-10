import { TestBed, async, inject } from '@angular/core/testing';

import { SystemAdminGuard } from './system-admin.guard';

describe('SystemAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemAdminGuard]
    });
  });

  it('should ...', inject([SystemAdminGuard], (guard: SystemAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
