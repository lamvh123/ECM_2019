import { TestBed, async, inject } from '@angular/core/testing';

import { TrainingStaffGuard } from './training-staff.guard';

describe('TrainingStaffGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingStaffGuard]
    });
  });

  it('should ...', inject([TrainingStaffGuard], (guard: TrainingStaffGuard) => {
    expect(guard).toBeTruthy();
  }));
});
