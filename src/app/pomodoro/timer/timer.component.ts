import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SessionTimeService } from '@app/core/session-time/session-time.service';
import { TimerType } from '@app/shared/model/timer-type.model';
import { SlidableSelectComponent } from '@app/shared/slidable-select/slidable-select.component';
import { Observable, Subscription, take, timer } from 'rxjs';

const pomodoroOptionLabels = [
  "20:00",
  "30:00",
  "60:00",
  "1:30:00",
  "2:00:00",
  "2:30:00",
  "3:00:00",
  "3:30:00",
  "4:00:00",
]

const hourOptionLabels = [
  "1:00:00",
  "2:00:00",
  "3:00:00",
  "4:00:00",
];

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() editMode = false;

  timerType$?: Observable<TimerType>;
  timerTypeSub?: Subscription;

  get selection() {
    return this.selectionValue;
  }
  set selection(value: number) {
    this.selectionValue = value;
    this.onSelectionChange();
  }

  selectionValue = 1;

  valueOptionsLabels = pomodoroOptionLabels;

  constructor(private sessionTime: SessionTimeService) { 
  }

  ngOnInit(): void {
    this.timerType$ = this.sessionTime.timerType$;
    this.timerTypeSub = this.timerType$.subscribe(timerType => {
      this.onTimerTypeChange(timerType);
    });
  }

  ngOnDestroy(): void {
    this.timerTypeSub?.unsubscribe();
  }

  onTimerTypeChange(timerType: TimerType) {
    switch(timerType) {
      case TimerType.Pomodoro:
      case TimerType.Indefinite:
        this.valueOptionsLabels = pomodoroOptionLabels;
        this.selection = 1;
        break;
      case TimerType.Hour:
        this.valueOptionsLabels = hourOptionLabels;
        this.selection = 0;
        break;
      default:
        throw new Error("Not implemented");
    }
  }

  onSelectionChange() {
    this.timerType$?.pipe(take(1)).subscribe(timerType => {
      switch (timerType) {
        case TimerType.Indefinite:
        case TimerType.Pomodoro:
          this.sessionTime.setSessionMinutes(this.selection === 0 ? 20 : this.selection * 30);
          break;
        case TimerType.Hour:
          this.sessionTime.setSessionMinutes(this.selection * 60);
          break;
      }
    });
  }
}