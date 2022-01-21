import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerService } from '../timer.service';
import { TimerStrategyBase } from './timer-strategy-base';
import { NextState, TimerStrategy } from './timer-strategy.interface';

export class PomodoroTimerStrategy extends TimerStrategyBase {
  override focusPeriod(): number {
    return 25 * 60;
  }

  override breakPeriod(): number {
    return 5 * 60;
  }
}
