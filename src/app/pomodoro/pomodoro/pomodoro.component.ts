import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TimerType } from '@app/shared/model/timer-type.model';
import { TimerService } from '@app/core/timer-service/timer.service';
import { map, Observable, Subscription, take, tap } from 'rxjs';
import { TimerState } from '@app/shared/model/timer-state.model';
import { environment } from 'src/environments/environment';
import { PomodoroTimerStrategy } from '@app/core/timer-service/timer-strategy/pomodoro-timer-strategy';
import { HourTimerStrategy } from '@app/core/timer-service/timer-strategy/hour-timer-strategy';
import { IndefiniteTimerStrategy } from '@app/core/timer-service/timer-strategy/indefinite-timer-strategy';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
  animations: [
    trigger('productivityVisible', [
      state(
        'in',
        style({
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          height: 0,
          transform: 'translateY(-10rem)',
        }),
        animate('0.5s'),
      ]),
    ]),
  ],
})
export class PomodoroComponent implements OnInit {
  production = environment.production;

  TimerType = TimerType;
  TimerState = TimerState;

  timerType$?: Observable<TimerType>;
  timerState$?: Observable<TimerState>;
  pauseAfterInterruption$?: Observable<boolean>;

  goalsVisible = false;
  timerActivated = false;
  editMode = false;

  constructor(public timerService: TimerService) {}

  ngOnInit(): void {
    this.timerType$ = this.timerService.timerType$;
    this.timerState$ = this.timerService.timerState$.pipe(
      tap(this.onTimerStateChange.bind(this))
    );
    this.pauseAfterInterruption$ = this.timerService.pauseAfterInterruption$;
  }

  onTimerTypeSwitch() {
    const switchValues = [
      { type: TimerType.Pomodoro, strategy: new PomodoroTimerStrategy() },
      { type: TimerType.Hour, strategy: new HourTimerStrategy() },
      {
        type: TimerType.Indefinite,
        strategy: new IndefiniteTimerStrategy(this.timerService),
      },
    ];

    this.timerType$?.pipe(take(1)).subscribe((timerType) => {
      // Switch to the next in the array; wrap when at the last
      const newValue =
        switchValues[
          (switchValues.findIndex((elem) => elem.type == timerType) + 1) %
            switchValues.length
        ];

      this.timerService.setTimerType(newValue.type, newValue.strategy);
    });
  }

  onClose() {
    this.timerService.stopTimer();
  }

  onEditSwitch() {
    this.editMode = !this.editMode;
  }

  onStart() {
    this.timerService.startTimer();
  }

  onBreak() {
    this.timerService.requestBreak();
  }

  onInterrupt() {
    this.timerState$?.pipe(take(1)).subscribe((state) => {
      switch (state) {
        case TimerState.Work:
        case TimerState.Break:
          this.timerService.requestInterruption();
          break;
        case TimerState.Interruption:
          this.timerService.pauseAfterInterruption$
            .pipe(take(1))
            .subscribe((shouldPause) => {
              if (shouldPause) {
                this.timerService.removePauseAfterInterruption();
              } else {
                this.timerService.addPauseAfterInterruption();
              }
            });
          break;
        case TimerState.Paused:
          this.timerService.resumeTimer();
          break;
        default:
          throw new Error('Unhandled state onInterrupt ' + state);
      }
    });
  }

  onTimerStateChange(state: TimerState) {
    this.timerActivated = state !== TimerState.Dead;
  }

  onDebug = environment.production
    ? () => {}
    : () => {
        this.timerService.DEBUG_almostSwitch!();
      };
}
