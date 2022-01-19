import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { getBreakTime } from '@app/shared';
import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerType } from '@app/shared/model/timer-type.model';
import {
  BehaviorSubject,
  interval,
  map,
  Observable,
  Subject,
  Subscription,
  take,
  takeUntil,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { TimeKeeper } from './time-keeper/time-keeper';
import { HourTimerStrategy } from './timer-strategy/hour-timer-strategy';
import { IndefiniteTimerStrategy } from './timer-strategy/indefinite-timer-strategy';
import { PomodoroTimerStrategy } from './timer-strategy/pomodoro-timer-strategy';
import {
  NextState,
  TimerStrategy,
} from './timer-strategy/timer-strategy.interface';

@Injectable({ providedIn: 'root'})
export class TimerService implements OnDestroy {
  // Period -> time slot with a state associated with it, like focus or break
  // Session -> time span of the entire countdown

  // Observable for the timer's type
  private timerType = new BehaviorSubject<TimerType>(TimerType.Pomodoro);

  // Observable for timer current state
  private timer = new BehaviorSubject<{
    secondsLeft?: number;
    state: TimerState;
  }>({ state: TimerState.Dead });

  // Observable for listening on whether timer should be paused after an interruption
  private pauseAfterInterruption = new BehaviorSubject<boolean>(false);

  // Total session time including the breaks, set by the user
  private totalSessionTime = new BehaviorSubject<number>(30 * 60);

  // Strategy for TimerType behaviour
  private timerStrategy: TimerStrategy = new PomodoroTimerStrategy();

  // Total time elapsed in
  private timeElapsed = 0;

  private timeElapsedBase = 0;

  private periodLength = 0;

  // Prevents switching on timer end
  private preventSwitchingOnTimerEnd = false;

  // Emits ngDestory event
  ngDestroy$ = new Subject();

  // Time elapsed during the focus session
  private periodSecondsElapsedValue = 0;
  public get periodSecondsElapsed() {
    return this.periodSecondsElapsedValue;
  }
  protected set periodSecondsElapsed(value: number) {
    this.periodSecondsElapsedValue = value;
  }

  constructor(private timeKeeper: TimeKeeper) {
    this.timeKeeper.tick$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(this.onTimerTick.bind(this));

    this.timeKeeper.end$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(this.onTimerEnd.bind(this));

    this.ngDestroy$.pipe(take(1)).subscribe((_) => {
      this.timeKeeper.stop();
    });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(null);
    this.ngDestroy$.complete();
  }

  // In seconds
  public get timeRemaining() {
    return Math.max(0, this.totalSessionTime.value - this.timeElapsed);
  }

  get totalSessionTime$() {
    return this.totalSessionTime.asObservable();
  }

  public get timerType$(): Observable<TimerType> {
    return this.timerType.asObservable();
  }

  public get timer$() {
    return this.timer.asObservable();
  }

  public get timerState$() {
    return this.timer.pipe(map((timer) => timer.state));
  }

  public get timeRemaining$() {
    return this.timer.pipe(map((_) => this.timeRemaining));
  }

  public get pauseAfterInterruption$() {
    return this.pauseAfterInterruption.asObservable();
  }

  public getTimer() {
    return this.timer.value;
  }

  public getTotalSessionTime() {
    return this.totalSessionTime.value;
  }

  public setTotalSessionTimeInMinutes(timeInMinutes: number) {
    if (timeInMinutes > 0) {
      this.totalSessionTime.next(timeInMinutes * 60);
    } else {
      throw new Error('Time in minutes was nonpositive');
    }
  }

  public setTimerType(timerType: TimerType, strategy: TimerStrategy) {
    this.timerStrategy = strategy;
    this.timerType.next(timerType);
  }

  public get focusPeriod(): number {
    return this.timerStrategy.focusPeriod();
  }

  public get breakPeriod(): number {
    return this.timerStrategy.breakPeriod();
  }

  public startTimer() {
    this.timeElapsed = 0;

    this.switchState(this.timerStrategy.onStartTimer(this));
  }

  public stopTimer() {
    this.switchState({ state: TimerState.Dead, stateDuration: 0 });
  }

  public requestBreak() {
    this.switchState({
      state: TimerState.Break,
      stateDuration: getBreakTime(this.periodSecondsElapsed),
    });
  }

  public requestInterruption() {
    const currentTimer = this.timer.value;

    switch (currentTimer.state) {
      case TimerState.Focus:
        this.switchState({
          state: TimerState.Interruption,
          stateDuration: getBreakTime(this.periodSecondsElapsed),
        });
        break;
      case TimerState.Break:
        this.switchState({
          state: TimerState.Interruption,
          stateDuration: currentTimer.secondsLeft!,
        });
        break;
      default:
        throw new Error(
          'Switched to interrupution from unhandled state: ' +
            currentTimer.state
        );
    }

    this.pauseAfterInterruption.next(true);
  }

  public resumeTimer() {
    if (this.timer.value.state === TimerState.Paused) {
      this.switchState(this.timerStrategy.onStateSwitch(this));
      this.removePauseAfterInterruption();
    }
  }

  public removePauseAfterInterruption() {
    this.pauseAfterInterruption.next(false);
  }

  public addPauseAfterInterruption() {
    this.pauseAfterInterruption.next(true);
  }

  private switchState(data: NextState) {
    this.stopTimerWithoutSwitching();

    this.periodSecondsElapsed = 0;

    this.periodLength = data.stateDuration;

    if (data.state === TimerState.Dead) {
      this.reset()

      this.timer.next({ state: data.state });
      return;
    } else if (data.state === TimerState.Paused) {
      this.timer.next({ state: data.state })
      return
    }

    this.timer.next({
      secondsLeft: data.stateDuration,
      state: data.state,
    });

    this.timeKeeper.start(data.stateDuration);
  }

  private onTimerTick(secondsElapsed: number) {
    const secondsLeft = this.periodLength - secondsElapsed;
    const currentState = this.timer.value.state;
    
    this.updateElapsedTime(secondsElapsed);

    this.timer.next({ secondsLeft: secondsLeft, state: currentState });
  }

  private onTimerEnd(secondsElapsed: number) {
    const currentState = this.timer.value.state;

    this.updateElapsedTime(secondsElapsed);

    this.timeElapsedBase = this.timeElapsed;

    if (this.preventSwitchingOnTimerEnd) {
      return;
    }

    if (
      currentState === TimerState.Interruption &&
      this.pauseAfterInterruption.value
    ) {
      // Pause when interruption ends
      this.switchState({ state: TimerState.Paused, stateDuration: 0 });
    } else {
      // Normal state switch
      this.switchState(this.timerStrategy.onStateSwitch(this));
    }
  }

  private updateElapsedTime(secondsElapsed: number) {
    this.periodSecondsElapsed = secondsElapsed;
    this.timeElapsed = this.timeElapsedBase + this.periodSecondsElapsed;
  }

  private stopTimerWithoutSwitching(){
    this.preventSwitchingOnTimerEnd = true;
    this.timeKeeper.stop();
    this.preventSwitchingOnTimerEnd = false;
  }

  private reset() {
    this.timeElapsed = 0;
    this.timeElapsedBase = 0;
    this.periodLength = 0;
    this.periodSecondsElapsed = 0;
  }
}
