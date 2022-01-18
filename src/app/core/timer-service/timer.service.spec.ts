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

  // should be the same as before the start on stopTimer()

  // should be the same as before the start on timer finish

  // should go to a break after a focus period

  // should be in break state after a requestBreak()

  // should resume after the break

  // should be in interruption state after a requestInterruption()

  // should pause after the interruption

  // should resume after the interruption after removePauseAfterInterruption()

  // should pause after adding the pause back in with addPauseAfterInterruption()
});
