import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerService } from '../timer.service';
import { NextState, TimerStrategy } from './timer-strategy.interface';

export class PomodoroTimerStrategy implements TimerStrategy {
  workPeriod(): number {
    return 25;
  }

  breakPeriod(): number {
    return 5;
  }

  onStartTimer(timerService: TimerService): NextState {
    return { state: TimerState.Work, stateDuration: this.workPeriod() };
  }

  onStateSwitch(timerService: TimerService): NextState {
    switch (timerService.getTime().state) {
      case TimerState.Work:
        return { state: TimerState.Break, stateDuration: this.breakPeriod() };
      case TimerState.Break:
        return { state: TimerState.Work, stateDuration: this.workPeriod() };
      default:
        throw new Error(
          'Argument Invalid for onstateSwitch: ' + timerService.getTime().state
        );
    }
  }
}
