import { Injectable, OnDestroy } from '@angular/core';
import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerType } from '@app/shared/model/timer-type.model';
import { BehaviorSubject, interval, Observable, Subject, Subscription } from 'rxjs';
import { HourTimerStrategy } from './timer-strategy/hour-timer-strategy';
import { IndefiniteTimerStrategy } from './timer-strategy/indefinite-timer-strategy';
import { PomodoroTimerStrategy } from './timer-strategy/pomodoro-timer-strategy';
import { NextState, TimerStrategy } from './timer-strategy/timer-strategy.interface';

@Injectable({
  providedIn: 'root',
})
export class TimerService implements OnDestroy {
  // Observable for the timer's type
  private timerType = new BehaviorSubject<TimerType>(TimerType.Pomodoro);

  // Observable for timer current state
  private timer = new BehaviorSubject<{
    secondsLeft?: number;
    state: TimerState;
  }>({ state: TimerState.Dead });

  // Total session time including the breaks, set by the user
  private totalSessionTimeMinutes = new BehaviorSubject<number>(30);

  // Session time left including the (possible) breaks
  private sessionTimeLeft = new BehaviorSubject<number>(25);

  // Subscription for interval function that counts down the timer
  private intervalSub?: Subscription;

  // Strategy for TimerType behaviour
  private timerStrategy: TimerStrategy = new PomodoroTimerStrategy();

  // Total time elapsed
  private timeElapsedValue = 0;
  public get timeElapsed() {
    return this.timeElapsedValue;
  }
  protected set timeElapsed(value: number) {
    this.timeElapsedValue = value;
  }

  // Time elapsed during the focus session
  private focusSessionDurationValue = 0;
  public get focusSessionDuration() {
    return this.focusSessionDurationValue;
  }
  protected set focusSessionDuration(value: number) {
    this.focusSessionDurationValue = value;
  }

  public get timeRemaining() {
    return Math.max(0, this.totalSessionTimeMinutes.value * 60 - this.timeElapsed);
  }

  constructor() {}

  ngOnDestroy(): void {
    this.intervalSub?.unsubscribe();
  }

  get totalSessionTime$() {
    return this.totalSessionTimeMinutes.asObservable();
  }

  public get timerType$(): Observable<TimerType> {
    return this.timerType.asObservable();
  }

  public get timer$() {
    return this.timer.asObservable();
  }

  public get sessionTimeLeft$() {
    return this.sessionTimeLeft.asObservable();
  }

  public getTimer() {
    return this.timer.value;
  }

  public getTotalSessionTime() {
    return this.totalSessionTimeMinutes.value;
  }

  public setTotalSessionTime(timeInMinutes: number) {
    this.totalSessionTimeMinutes.next(timeInMinutes);
  }

  public setTimerType(timerType: TimerType) {
    switch (timerType) {
      case TimerType.Pomodoro:
        this.timerStrategy = new PomodoroTimerStrategy();
        break;
      case TimerType.Hour:
        this.timerStrategy = new HourTimerStrategy();
        break;
      case TimerType.Indefinite:
        this.timerStrategy = new IndefiniteTimerStrategy(this);
        break;
      default:
        throw new Error('Not implemented');
    }

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
    this.intervalSub?.unsubscribe();
    this.timer.next({ state: TimerState.Dead });
  }

  public requestBreak() {
    this.switchState({ state: TimerState.Break, stateDuration: this.getBreakTime(this.focusSessionDuration) });
  }

  public getBreakTime(timePassed: number) {
    return Math.ceil(Math.max(5 * 60, timePassed / 5));
  }

  public requestInterruption() {
    throw new Error('Not implemented');
  }

  public isRunning(): boolean {
    return this.timer.value.state !== TimerState.Dead;
  }

  private switchState(data: NextState) {
    this.intervalSub?.unsubscribe();
    this.focusSessionDuration = 0;

    if (data.state === TimerState.Dead) {
      this.timer.next({ state: TimerState.Dead })
      return;
    }

    this.timer.next({
      secondsLeft: data.stateDuration,
      state: data.state,
    });

    this.intervalSub = interval(1000).subscribe((_) => {
      const secondsLeft = this.timer.value.secondsLeft! - 1;
      this.timeElapsed += 1;
      this.focusSessionDuration += 1;

      if (secondsLeft > 0) {
        this.timer.next({ secondsLeft: secondsLeft, state: data.state });
      } else {
        this.switchState(this.timerStrategy.onStateSwitch(this));
      }
    });
  }

  public DEBUG_almostSwitch() {
    const state = this.timer.value.state;
    this.timeElapsed += this.timer.value.secondsLeft!-3;

    this.timer.next({ secondsLeft: 3, state: state });
  }
}
