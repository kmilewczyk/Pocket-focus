import { TestBed } from '@angular/core/testing';
import { SelectControlValueAccessor } from '@angular/forms';
import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerType } from '@app/shared/model/timer-type.model';
import { filter, skip, take, timer } from 'rxjs';
import { TimeKeeper } from './time-keeper/time-keeper';
import { IndefiniteTimerStrategy } from './timer-strategy/indefinite-timer-strategy';
import { PomodoroTimerStrategy } from './timer-strategy/pomodoro-timer-strategy';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;
  let timeKeeper: TimeKeeper;

  let expectState = (expectedState: TimerState) => {
    service.timerState$.pipe(take(1)).subscribe(state => {
      expect(state).toEqual(expectedState);
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TimeKeeper, use: new TimeKeeper() }],
    });
    service = TestBed.inject(TimerService);
    timeKeeper = TestBed.inject(TimeKeeper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return total session time after set', () => {
    const timeSet = 50;
    service.setTotalSessionTimeInMinutes(timeSet);
    expect(service.getTotalSessionTime() / 60).toEqual(timeSet);
    service.totalSessionTime$.pipe(take(1)).subscribe((totalTime) => {
      expect(totalTime / 60).toEqual(timeSet);
    });
  });

  it('should fail on setting total session time to negative number', () => {
    expect(() => {
      service.setTotalSessionTimeInMinutes(-12);
    }).toThrow();
  });

  it('should fail on setting total session time to zero', () => {
    expect(() => {
      service.setTotalSessionTimeInMinutes(0);
    }).toThrow();
  });

  it('should have timeRemaining equal to total session time after a stopTimer', () => {
    service.setTotalSessionTimeInMinutes(43);
    service.setTimerType(TimerType.Pomodoro, new PomodoroTimerStrategy());
    service.startTimer();
    service.stopTimer();
    expect(service.timeRemaining / 60).toEqual(43);
  });

  it('should return set timerType', () => {
    service.setTimerType(TimerType.Pomodoro, new PomodoroTimerStrategy());
    service.timerType$.pipe(take(1)).subscribe((type) => {
      expect(type).toEqual(TimerType.Pomodoro);
    });
  });

  it("should use the strategy's focus period", () => {
    const strategy = new PomodoroTimerStrategy();
    service.setTimerType(TimerType.Pomodoro, strategy);
    expect(service.focusPeriod).toEqual(strategy.focusPeriod());
  });

  it("should use the strategy's break period", () => {
    const strategy = new IndefiniteTimerStrategy(service);
    service.setTimerType(TimerType.Pomodoro, strategy);
    expect(service.breakPeriod).toEqual(strategy.breakPeriod());
  });

  it('should emit timer tick with focus type on the start', () => {
    const strategy = new PomodoroTimerStrategy();
    let tickEmitted = false;

    service.setTimerType(TimerType.Pomodoro, strategy);
    service.setTotalSessionTimeInMinutes(30);

    service.timer$.pipe(skip(1), take(1)).subscribe((tick) => {
      expect(tick.state).toEqual(TimerState.Focus);
      expect(tick.secondsLeft).toEqual(strategy.focusPeriod());
      tickEmitted = true;
    });

    service.startTimer();

    expect(tickEmitted).toBeTrue();

    service.stopTimer();
  });

  it('should go to a break after a focus period', () => {
    const strategy = new PomodoroTimerStrategy();
    service.setTotalSessionTimeInMinutes(40);
    service.setTimerType(TimerType.Pomodoro, strategy);
    service.startTimer();

    // Forces timeKeeper stop so timer switches to next state
    timeKeeper.stop();

    expectState(TimerState.Break);
  });

  it('should be in break state after a requestBreak()', () => {
    service.setTotalSessionTimeInMinutes(33);
    service.setTimerType(TimerType.Pomodoro, new PomodoroTimerStrategy());

    service.startTimer();
    service.requestBreak();
    expectState(TimerState.Break);
  });

  it('should resume after the break', () => {
    const strategy = new PomodoroTimerStrategy();
    service.setTotalSessionTimeInMinutes(100);
    service.setTimerType(TimerType.Pomodoro, strategy);

    service.startTimer();
    timeKeeper.forward(strategy.focusPeriod());

    expectState(TimerState.Break);

    timeKeeper.forward(strategy.breakPeriod());

    expectState(TimerState.Focus);

    service.stopTimer();
  });

  it("shouldn't go to break after after half the time passed", () => {
    const strategy = new PomodoroTimerStrategy();
    service.setTotalSessionTimeInMinutes(100);
    service.setTimerType(TimerType.Pomodoro, strategy);

    service.startTimer();

    timeKeeper.forward(strategy.focusPeriod() / 2);

    expectState(TimerState.Focus);

    service.stopTimer();
  });

  it('should have a pomodoro timer on default', () => {
    const strategy = new PomodoroTimerStrategy();

    service.timerType$.pipe(take(1)).subscribe((type) => {
      expect(type).toEqual(TimerType.Pomodoro);
    });

    expect(service.focusPeriod).toEqual(strategy.focusPeriod());
    expect(service.breakPeriod).toEqual(strategy.breakPeriod());
  });

  it('should stop timer after destruction', () => {
    service.setTotalSessionTimeInMinutes(100);
    service.startTimer();
    service.ngOnDestroy();
    expect(timeKeeper.isActive()).toBeFalse();
    timeKeeper.stop();
  });

  it('should be in interruption state after a requestInterruption()', () => {
    service.setTotalSessionTimeInMinutes(30);
    service.startTimer();
    service.requestInterruption();

    expectState(TimerState.Interruption);

    service.stopTimer();
  });

  it('should pause after an interruption ends', () => {
    service.setTotalSessionTimeInMinutes(30);
    service.startTimer();
    service.requestInterruption();

    timeKeeper.stop();

    expectState(TimerState.Paused);

    service.stopTimer();
  });

  it('should end after two focus sessions', () => {
    const strategy = new PomodoroTimerStrategy();

    service.setTotalSessionTimeInMinutes(60);
    service.startTimer();

    expectState(TimerState.Focus);

    timeKeeper.forward(strategy.focusPeriod());
    expectState(TimerState.Break);

    timeKeeper.forward(strategy.breakPeriod());
    expectState(TimerState.Focus);

    timeKeeper.forward(strategy.focusPeriod());
    expectState(TimerState.Break);

    timeKeeper.forward(strategy.breakPeriod());
    expectState(TimerState.Dead);

    timeKeeper.stop();
  });

  it('should resume after the interruption after removePauseAfterInterruption()', () => {
    service.setTotalSessionTimeInMinutes(30);
    service.startTimer();
    service.requestInterruption();
    expectState(TimerState.Interruption);
    service.removePauseAfterInterruption();
    timeKeeper.stop();
    expectState(TimerState.Focus);

    service.stopTimer();
  });

  it('should pause after adding the pause back in with addPauseAfterInterruption()', () => {
    service.setTotalSessionTimeInMinutes(30);

    service.startTimer();
    service.requestInterruption();
    expectState(TimerState.Interruption);

    service.removePauseAfterInterruption();
    service.addPauseAfterInterruption();
    timeKeeper.stop();
    expectState(TimerState.Paused);

    service.stopTimer();

  });

  // should retain remaining break time when intrrupting
});
