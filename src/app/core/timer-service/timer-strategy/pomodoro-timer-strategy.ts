import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerService } from '../timer.service';
import { NextState, TimerStrategy } from './timer-strategy.interface';

export class PomodoroTimerStrategy implements TimerStrategy {
  workPeriod(): number {
    return 25 * 60;
  }

  breakPeriod(): number {
    return 5 * 60;
  }

  onStartTimer(timerService: TimerService): NextState {
    return { state: TimerState.Work, stateDuration: this.workPeriod() };
  }

  onStateSwitch(timerService: TimerService): NextState {
    switch (timerService.getTimer().state) {
      case TimerState.Work:
        return { state: TimerState.Break, stateDuration: this.breakPeriod() };
      case TimerState.Break:
        const workTime = Math.min(timerService.timeRemaining, this.workPeriod());

        if (timerService.timeRemaining > 0) {
            return { state: TimerState.Work, stateDuration: workTime};
        } else {
            return { state: TimerState.Dead, stateDuration: 0 }
        }
      default:
        throw new Error(
          'Argument Invalid for onstateSwitch: ' + timerService.getTimer().state
        );
    }
  }
}
