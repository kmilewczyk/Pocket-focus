import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerService } from '../timer.service';
import { NextState, TimerStrategy } from './timer-strategy.interface';

export class IndefiniteTimerStrategy implements TimerStrategy {
  constructor(private timerService: TimerService) {}

  focusPeriod(): number {
    return this.timerService.getTotalSessionTime() * 60;
  }

  breakPeriod(): number {
    return this.timerService.getBreakTime(this.timerService.focusSessionDuration);
  }

  onStartTimer(timerService: TimerService): NextState {
    return { state: TimerState.Work, stateDuration: this.focusPeriod() }
  }

  onStateSwitch(timerService: TimerService): NextState {
    switch (timerService.getTimer().state) {
      case TimerState.Work:
        return { state: TimerState.Dead, stateDuration: 0 }
      case TimerState.Break:
        if (timerService.timeRemaining > 0) {
          return { state: TimerState.Work, stateDuration: timerService.timeRemaining };
        } else {
          return { state: TimerState.Dead, stateDuration: 0 };
        }
      default:
        throw new Error(
          'Argument Invalid for onstateSwitch: ' + timerService.getTimer().state
        );
    }
  }
}
