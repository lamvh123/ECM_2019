import { TestBed, async, inject } from '@angular/core/testing';

import { CenterAdminGuard } from './center-admin.guard';

describe('CenterAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CenterAdminGuard]
    });
  });

  it('should ...', inject([CenterAdminGuard], (guard: CenterAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
