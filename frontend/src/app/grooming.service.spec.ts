import { TestBed } from '@angular/core/testing';

import { GroomingService } from './grooming.service';

describe('GroomingService', () => {
  let service: GroomingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroomingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
