import { TimerStrategyBase } from './timer-strategy-base';

export class PomodoroTimerStrategy extends TimerStrategyBase {
  override focusPeriod(): number {
    return 25 * 60;
  }

  override breakPeriod(): number {
    return 5 * 60;
  }
}
