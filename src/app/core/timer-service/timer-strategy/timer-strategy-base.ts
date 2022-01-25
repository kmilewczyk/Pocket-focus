import { TimerState } from "@app/shared/model/timer-state.model";
import { TimerService } from "../timer.service";
import { NextState, TimerStrategy } from "./timer-strategy.interface";

// Base class that implements basic logic. Inheriting from this class is optional as it
// serves reducing boilerplate
export class TimerStrategyBase implements TimerStrategy {
  constructor() {}

  focusPeriod(): number {
    throw new Error('Method not implemented.');
  }

  breakPeriod(): number {
    throw new Error('Method not implemented.');
  }

  onStartTimer(timerService: TimerService): NextState {
    if (timerService.getTimer().state === TimerState.Dead) {
      return { state: TimerState.Focus, stateDuration: this.focusPeriod() };
    }

    throw new Error('Timer is not dead before the start.');
  }

  onPeriodEnd(timerService: TimerService): NextState {
    const currentState = timerService.getTimer().state;
    switch (currentState) {
      case TimerState.Focus:
        return this.nextBreakOrTimerEnd(timerService);

      case TimerState.Interruption:
        if (timerService.pauseAfterInterruption) {
          return { state: TimerState.Paused, stateDuration: 0 };
        }
        return this.nextFocusSessionOrTimerEnd(timerService);

      case TimerState.Break:
        return this.nextFocusSessionOrTimerEnd(timerService);

      case TimerState.Dead:
        throw new Error(
          "TimerState Dead cannot switch onPeriodEnd. It shouldn't have a timer."
        );

      case TimerState.Paused:
        throw new Error(
          "TimerState Paused cannot switch onPeriodEnd. It shouldn't have a timer."
        );

      default:
        throw new Error(
          'State switch on the end of ' +
            (currentState as any).toString() +
            ' is not implemented'
        );
    }
  }

  onRequestBreak(timerService: TimerService): NextState {
    const currentState = timerService.getTimer().state;
    if (currentState === TimerState.Focus) {
      return { state: TimerState.Break, stateDuration: this.breakPeriod() };
    }

    throw new Error(
      'Cannot request break from state ' + currentState.toString() + '.'
    );
  }

  onRequestInterruption(timerService: TimerService): NextState {
    const currentTimer = timerService.getTimer();

    switch (currentTimer.state) {
      case TimerState.Focus:
        return {
          state: TimerState.Interruption,
          stateDuration: this.breakPeriod(),
        };
      case TimerState.Break:
        return {
          state: TimerState.Interruption,
          stateDuration: currentTimer.secondsLeft!,
        };
      default:
        throw new Error(
          'Cannot request interruption from state ' +
            currentTimer.state.toString()
        );
    }
  }

  onStopTimer(timerService: TimerService): NextState {
    return { state: TimerState.Dead, stateDuration: 0 };
  }

  onResumeTimer(timerService: TimerService): NextState {
    const currentState = timerService.getTimer().state;
    if (currentState === TimerState.Paused) {
      return this.nextFocusSessionOrTimerEnd(timerService);
    }

    throw new Error(
      'Cannot resume timer from ' + currentState.toString() + ' state.'
    );
  }

  protected nextFocusSessionOrTimerEnd(timerService: TimerService): NextState {
    const focusTime = Math.min(timerService.timeRemaining, this.focusPeriod());

    if (timerService.timeRemaining > 0) {
      return { state: TimerState.Focus, stateDuration: focusTime };
    } else {
      return { state: TimerState.Dead, stateDuration: 0 };
    }
  }

  private nextBreakOrTimerEnd(timerService: TimerService): NextState {
    const breakTime = Math.min(timerService.timeRemaining, this.breakPeriod());

    if (timerService.timeRemaining > 0) {
      return { state: TimerState.Break, stateDuration: breakTime };
    } else {
      return { state: TimerState.Dead, stateDuration: 0 };
    }
  }
}