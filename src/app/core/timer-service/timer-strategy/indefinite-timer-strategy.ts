import { getBreakTime } from '@app/shared';
import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerService } from '../timer.service';
import { TimerStrategyBase } from './timer-strategy-base';
import { NextState, TimerStrategy } from './timer-strategy.interface';

export class IndefiniteTimerStrategy extends TimerStrategyBase {
  constructor(private timerService: TimerService) {
    super();
  }

  override focusPeriod(): number {
    return Math.min(
      this.timerService.timeRemaining,
      this.timerService.getTotalSessionTime()
    );
  }

  override breakPeriod(): number {
    return getBreakTime(this.timerService.periodSecondsElapsed);
  }
}
