import { TestBed } from '@angular/core/testing';
import { TimerType } from '@app/shared/model/timer-type.model';
import { take } from 'rxjs';
import { PomodoroTimerStrategy } from './timer-strategy/pomodoro-timer-strategy';

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

  it('Should return total session time after set', () => {
    const timeSet = 50;
    service.setTotalSessionTimeInMinutes(timeSet);
    expect(service.getTotalSessionTime()/60).toEqual(timeSet);
    service.totalSessionTime$.pipe(take(1)).subscribe((totalTime) => {
      expect(totalTime/60).toEqual(timeSet);
    });
  });

  it('should fail on setting total session time to negative number', () => {
    expect(() => { service.setTotalSessionTimeInMinutes(-12); }).toThrow();
  });

  it('should fail on setting total session time to zero', () => {
    expect(() => { service.setTotalSessionTimeInMinutes(0); }).toThrow();
  });

  it('should return after stop a time remaining equal to total session time', () => {
    service.setTotalSessionTimeInMinutes(43);
    service.setTimerType(TimerType.Pomodoro, new PomodoroTimerStrategy());
    service.startTimer();
    service.stopTimer();
    expect(service.timeRemaining/60).toEqual(43);
  });

  // should return set timerType

  // should use the strategy's focus period

  // should use the strategy's break period

  // should emit timer tick with focus type on the start

  // should go to a break after a focus period

  // should be in break state after a requestBreak()

  // should resume after the break

  // should be in interruption state after a requestInterruption()

  // should pause after the interruption

  // should resume after the interruption after removePauseAfterInterruption()

  // should pause after adding the pause back in with addPauseAfterInterruption()
});
