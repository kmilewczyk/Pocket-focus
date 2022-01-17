import {
  Component,
  MissingTranslationStrategy,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TimerType } from '@app/shared/model/timer-type.model';
import { SlidableSelectComponent } from '@app/shared/slidable-select/slidable-select.component';
import { TimerService } from '@app/core/timer-service/timer.service';
import { map, Observable, Observer, Subscription, take } from 'rxjs';
import { TimerState } from '@app/shared/model/timer-state.model';

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
  TimerType = TimerType;
  TimerState = TimerState;

  timerType$?: Observable<TimerType>;

  timerSub?: Subscription;

  goalsVisible = false;

  timerRunning = false;
  
  timerStateValue?: TimerState;
  get timerState(): TimerState | undefined {
    return this.timerStateValue
  }
  set timerState(value: TimerState | undefined) {
    this.timerStateValue = value;
    this.timerRunning = value !== TimerState.Dead;
  }

  editMode = false;

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

    this.timerSub = this.timerService.timer$.subscribe(tick => {
      this.timerState = tick.state;
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
    this.timerService.DEBUG_almostSwitch();
  }

  onInterrupt() {}
}
