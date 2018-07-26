import { TestBed, async, inject } from '@angular/core/testing';

import { EncargadoGuard } from './encargado.guard';

describe('EncargadoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncargadoGuard]
    });
  });

  it('should ...', inject([EncargadoGuard], (guard: EncargadoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
