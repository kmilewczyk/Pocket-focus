import { TestBed } from '@angular/core/testing';

import { SessionTimeService } from './session-time.service';

describe('SessionTimeService', () => {
  let service: SessionTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
