import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerService } from '../timer.service';
import { NextState, TimerStrategy } from './timer-strategy.interface';

export class HourTimerStrategy implements TimerStrategy {
  focusPeriod(): number {
    return 50 * 60;
  }
  breakPeriod(): number {
    return 10 * 60;
  }
  onStartTimer(timerService: TimerService): NextState {
    return { state: TimerState.Work, stateDuration: this.focusPeriod() };
  }
  onStateSwitch(timerService: TimerService): NextState {
    switch (timerService.getTimer().state) {
      case TimerState.Work:
        return { state: TimerState.Break, stateDuration: this.breakPeriod() };
      case TimerState.Paused:
      case TimerState.Interruption:
      case TimerState.Break:
        const focusTime = Math.min(
          timerService.timeRemaining,
          this.focusPeriod()
        );

        if (timerService.timeRemaining > 0) {
          return { state: TimerState.Work, stateDuration: focusTime };
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
