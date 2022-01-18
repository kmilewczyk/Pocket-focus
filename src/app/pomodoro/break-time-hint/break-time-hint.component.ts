import { Component, OnInit } from '@angular/core';
import { TimerService } from '@app/core/timer-service/timer.service';
import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerType } from '@app/shared/model/timer-type.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-pomodoro-break-time-hint',
  templateUrl: './break-time-hint.component.html',
  styleUrls: ['./break-time-hint.component.scss'],
})
export class BreakTimeHintComponent implements OnInit {
  TimerState = TimerState;

  timerState$?: Observable<number>;
  timeBreakMinutes$?: Observable<number | undefined>;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerState$ = this.timerService.timerState$;
    this.timeBreakMinutes$ = this.timerService.timerType$.pipe(
      map((type) => {
        switch (type) {
          case TimerType.Pomodoro:
            return 5;
          case TimerType.Hour:
            return 10;
          case TimerType.Indefinite:
            return undefined;
          default:
            return undefined;
        }
      })
    );
  }
}
