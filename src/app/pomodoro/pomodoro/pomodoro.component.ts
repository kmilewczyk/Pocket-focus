import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TimerType } from '@app/shared/model/timer-type.model';
import { TimerService } from '@app/core/timer-service/timer.service';
import { map, Observable, Subscription, take } from 'rxjs';
import { TimerState } from '@app/shared/model/timer-state.model';
import { environment } from 'src/environments/environment';

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
export class PomodoroComponent implements OnInit, OnDestroy {
  production = environment.production;

  TimerType = TimerType;
  TimerState = TimerState;

  timerType$?: Observable<TimerType>;

  timerSub?: Subscription;

  goalsVisible = false;

  timerActivated = false;
  
  timerStateValue?: TimerState;
  get timerState(): TimerState | undefined {
    return this.timerStateValue
  }
  set timerState(value: TimerState | undefined) {
    this.timerStateValue = value;
    this.timerActivated = value !== TimerState.Dead;
  }

  editMode = false;

  minutesRemaining = 0;

  pauseAfterInterruption$?: Observable<boolean>;


  get totalTime$() {
    return this.timerService.totalSessionTime$.pipe(
      map((totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const leftMinutes = totalMinutes % 60;
        const hourLabel =
          hours > 0 ? hours + (hours > 1 ? ' hours' : ' hour') : '';
        const minuteLabel =
          leftMinutes > 0
            ? leftMinutes + (leftMinutes > 1 ? ' minutes' : ' minute')
            : '';

        return hourLabel + ' ' + minuteLabel;
      })
    );
  }

  constructor(public timerService: TimerService) {}

  ngOnInit(): void {
    this.timerType$ = this.timerService.timerType$;
    this.pauseAfterInterruption$ = this.timerService.pauseAfterInterruption$;

    this.timerSub = this.timerService.timer$.subscribe(tick => {
      this.timerState = tick.state;
      this.updateTimeRemaining();
    })
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

  onTimerTypeSwitch() {
    const switchValues = [
      TimerType.Pomodoro,
      TimerType.Hour,
      TimerType.Indefinite,
    ];

    this.timerType$?.pipe(take(1)).subscribe((timerType) => {
      // Switch to the next in the array; wrap when at the last
      const newType =
        switchValues[
          (switchValues.indexOf(timerType) + 1) % switchValues.length
        ];

      this.timerService.setTimerType(newType);
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
    switch(this.timerState) {
      case TimerState.Work:
      case TimerState.Break:
        this.timerService.requestInterruption();
        break
      case TimerState.Interruption:
        this.timerService.pauseAfterInterruption$.pipe(take(1)).subscribe(shouldPause => {
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
        throw new Error("Unhandled state onInterrupt " + this.timerState);
    }
  }

  onDebug() {
    if (!environment.production)
      this.timerService.DEBUG_almostSwitch!();
  }

  private updateTimeRemaining() {
    this.minutesRemaining = Math.ceil(this.timerService.timeRemaining / 60);
  }
}
