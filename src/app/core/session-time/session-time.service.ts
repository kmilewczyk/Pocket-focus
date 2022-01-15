import { Injectable } from '@angular/core';
import { TimerType } from '@app/shared/model/timer-type.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeService {
  private timerType = new BehaviorSubject<TimerType>(TimerType.Pomodoro)
  private sessionMinutes = new BehaviorSubject<number>(30);

  constructor() { }

  public get sessionMinutes$() {
    return this.sessionMinutes.asObservable();
  }

  public setSessionMinutes(timeInMinutes: number) {
    this.sessionMinutes.next(timeInMinutes);
  }

  get timerType$(): Observable<TimerType> {
    return this.timerType.asObservable();
  }

  public setTimerType(timerType: TimerType) {
    this.timerType.next(timerType);
  }

  public getBreakTime(timePassed: number) {
    return Math.ceil(Math.min(5, timePassed / 5));
  }

  public sliceWorkTime(): number | undefined {
    switch (this.timerType.value) {
      case TimerType.Pomodoro:
        return 25;
      case TimerType.Hour:
        return 50;
      case TimerType.Indefinite:
        return undefined;
      default:
        throw new Error("Not implemented");
    }
  }

  public sliceBreakTime() {
    switch (this.timerType.value) {
      case TimerType.Pomodoro:
        return 5;
      case TimerType.Hour:
        return 10 ;
      case TimerType.Indefinite:
        return undefined;
      default:
        throw new Error("Not implemented");
    }
  }
}
