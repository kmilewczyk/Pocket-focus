import { TestBed } from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Should return total session time after set

  // should fails on negative total session time set

  // should return set timerType

  // should use the strategy's focus period

  // should use the strategy's break period

  // should emit timer tick with focus type on the start
});
