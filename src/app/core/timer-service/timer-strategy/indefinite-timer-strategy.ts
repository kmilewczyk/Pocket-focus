import { getBreakTime } from '@app/shared';
import { TimerService } from '../timer.service';
import { TimerStrategyBase } from './timer-strategy-base';

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
