import { TestBed, async, inject } from '@angular/core/testing';

import { ChoferGuard } from './chofer.guard';

describe('ChoferGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoferGuard]
    });
  });

  it('should ...', inject([ChoferGuard], (guard: ChoferGuard) => {
    expect(guard).toBeTruthy();
  }));
});
