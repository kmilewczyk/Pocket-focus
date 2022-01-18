import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TimerService } from '@app/core/timer-service/timer.service';
import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerType } from '@app/shared/model/timer-type.model';
import { Subscription } from 'rxjs';

const pomodoroOptionLabels = [
  '30:00',
  '1:00:00',
  '1:30:00',
  '2:00:00',
  '2:30:00',
  '3:00:00',
  '3:30:00',
  '4:00:00',
  '4:30:00',
  '5:00:00',
  '5:30:00',
  '6:00:00',
  '6:30:00',
  '7:00:00',
  '7:30:00',
  '8:00:00',
];

const hourOptionLabels = [
  '1:00:00',
  '2:00:00',
  '3:00:00',
  '4:00:00', 
  '5:00:00', 
  '6:00:00', 
  '7:00:00', 
  '8:00:00', 
];

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  TimerState = TimerState;

  @Input() editMode = false;

  timer?: Subscription;
  timerTypeSub?: Subscription;

  timerState?: TimerState;
  timerType?: TimerType;

  get selection() {
    return this.selectionValue;
  }
  set selection(value: number) {
    this.selectionValue = value;
    this.onSelectionChange();
  }

  selectionValue = 0;

  valueOptionsLabels = pomodoroOptionLabels;

  timeHours = 0;
  timeMinutes = 0;
  timeSeconds = 0;

  timeBreakMinutes?: number;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerTypeSub = this.timerService.timerType$.subscribe((timerType) => {
      this.timerType = timerType;
      this.onTimerTypeChange();
    });

    this.timerService.setTotalSessionTime(30);

    this.timer = this.timerService.timer$.subscribe((tickData) => {
      this.timerState = tickData.state;
      switch(this.timerState) {
        case TimerState.Dead:
          this.setTime(this.timerService.focusPeriod);
          break;
        case TimerState.Paused:
          this.setTime(0);
          break;
        case TimerState.Break:
        case TimerState.Interruption:
        case TimerState.Work:
          this.setTime(tickData.secondsLeft!);
          break;
        default:
          throw new Error("Unhandled TimerState " + this.TimerState + " at timer.component");
      }
    });
  }

  ngOnDestroy(): void {
    this.timerTypeSub?.unsubscribe();
    this.timer?.unsubscribe();
  }

  onTimerTypeChange() {
    switch (this.timerType) {
      case TimerType.Pomodoro:
        this.valueOptionsLabels = pomodoroOptionLabels;
        this.selection = 0;
        this.timeBreakMinutes = 5;
        break;
      case TimerType.Hour:
        this.valueOptionsLabels = hourOptionLabels;
        this.selection = 0;
        this.timeBreakMinutes = 10;
        break;
      case TimerType.Indefinite:
        this.valueOptionsLabels = pomodoroOptionLabels;
        this.selection = 0;
        this.timeBreakMinutes = undefined;
        break;
      default:
        throw new Error('Not implemented');
    }

    this.setTime(this.timerService.focusPeriod);
  }

  onSelectionChange() {
    switch (this.timerType) {
      case TimerType.Indefinite:
      case TimerType.Pomodoro:
        this.timerService.setTotalSessionTime(
          (this.selection + 1) * 30
        );
        break;
      case TimerType.Hour:
        this.timerService.setTotalSessionTime((this.selection + 1) * 60);
        break;
    }

    this.setTime(this.timerService.focusPeriod);
  }

  private setTime(seconds: number) {
    this.timeHours = Math.floor(seconds / 3600);
    this.timeMinutes = Math.floor(seconds / 60) - this.timeHours * 60;
    this.timeSeconds = seconds - this.timeMinutes * 60 - this.timeHours * 3600;
  }
}
