import { Component, OnInit } from '@angular/core';
import { TimerService } from '@app/core/timer-service/timer.service';
import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerType } from '@app/shared/model/timer-type.model';
import { map, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-pomodoro-break-time-hint',
  templateUrl: './break-time-hint.component.html',
  styleUrls: ['./break-time-hint.component.scss'],
})
export class BreakTimeHintComponent implements OnInit {
  TimerState = TimerState;
  TimerType = TimerType;

  timerState$?: Observable<number>;
  timerType$?: Observable<TimerType>;
  timeBreakMinutes$?: Observable<number | undefined>;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerState$ = this.timerService.timerState$;
    this.timerType$ = this.timerService.timerType$;
    this.timeBreakMinutes$ = merge(
      this.timerService.timer$,
      this.timerService.timerType$
    ).pipe(
      map((_) => {
        return Math.floor(this.timerService.breakPeriod / 60);
      })
    );
  }
}
